import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import achievements from './_shared/achievements.json' assert { type: 'json' }

// Types for our achievements
interface Achievement {
  id: string
  name: string
  description: string
  category: string
  criteria: {
    type: string
    value: number
    difficulty?: string
    accuracy?: number
    lesson_title?: string
    phrase?: string
  }
}

interface AttemptRecord {
  id: string
  user_id: string
  lesson_id: string
  wpm: number
  accuracy: number
  completed_at: string
  key_press_data: any | null
}

interface UserAchievement {
  user_id: string
  achievement_id: string
  achieved_at: string
}

Deno.serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the new lesson result from the webhook payload
    const { record } = await req.json()
    const userId = record.user_id

    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user_id found in record' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Fetch user's existing achievements
    const { data: existingAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId)

    const earnedAchievementIds = new Set(
      existingAchievements?.map(a => a.achievement_id) || []
    )

    // Fetch all user's lesson attempts
    const { data: userAttempts } = await supabase
      .from('attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (!userAttempts) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user attempts' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Also fetch lesson details to get titles and difficulty
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, title, lesson_type')

    const lessonMap = new Map(lessons?.map(l => [l.id, l]) || [])

    // Fetch achievement records from database to get UUIDs
    const { data: dbAchievements } = await supabase
      .from('achievements')
      .select('id, code')
    
    const achievementCodeToId = new Map(dbAchievements?.map(a => [a.code, a.id]) || [])

    // Process achievements
    const newlyAwarded: Achievement[] = []

    for (const achievement of achievements as Achievement[]) {
      // Skip if user already has this achievement (check by achievement code)
      const dbAchievementId = achievementCodeToId.get(achievement.id)
      if (!dbAchievementId || earnedAchievementIds.has(dbAchievementId)) {
        continue
      }

      // Check if criteria are met
      const criteriaMatch = await checkAchievementCriteria(
        achievement,
        userAttempts,
        lessonMap,
        supabase
      )

      if (criteriaMatch) {
        // Award the achievement using the database UUID
        const { error } = await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: dbAchievementId,
            achieved_at: new Date().toISOString()
          })

        if (!error) {
          newlyAwarded.push(achievement)
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      newlyAwarded: newlyAwarded.map(a => ({
        id: a.id,
        name: a.name,
        description: a.description
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in award-achievements function:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

// Helper function to check achievement criteria
async function checkAchievementCriteria(
  achievement: Achievement,
  userAttempts: AttemptRecord[],
  lessonMap: Map<string, any>,
  supabase: any
): Promise<boolean> {
  const { criteria } = achievement

  switch (criteria.type) {
    case 'total_lessons':
      return checkTotalLessons(userAttempts, criteria.value)
    
    case 'lessons_by_difficulty':
      return checkLessonsByDifficulty(userAttempts, lessonMap, criteria.difficulty!, criteria.value)
    
    case 'max_wpm':
      return checkMaxWpm(userAttempts, criteria.value)
    
    case 'high_accuracy_count':
      return checkHighAccuracyCount(userAttempts, criteria.accuracy!, criteria.value)
    
    case 'perfect_accuracy':
      return checkPerfectAccuracy(userAttempts, criteria.value)
    
    case 'streak':
      return checkStreak(userAttempts, criteria.value)
    
    case 'total_words':
      return checkTotalWords(userAttempts, criteria.value)
    
    case 'specific_lesson':
      return checkSpecificLesson(userAttempts, lessonMap, criteria.lesson_title!)
    
    case 'specific_phrase':
      return checkSpecificPhrase(userAttempts, criteria.phrase!)
    
    default:
      return false
  }
}

// Helper functions for each criteria type
function checkTotalLessons(attempts: AttemptRecord[], requiredCount: number): boolean {
  const uniqueLessons = new Set(attempts.map(a => a.lesson_id))
  return uniqueLessons.size >= requiredCount
}

function checkLessonsByDifficulty(
  attempts: AttemptRecord[],
  lessonMap: Map<string, any>,
  difficulty: string,
  requiredCount: number
): boolean {
  const difficultyLessons = attempts.filter(attempt => {
    const lesson = lessonMap.get(attempt.lesson_id)
    return lesson && lesson.lesson_type === difficulty
  })
  
  const uniqueDifficultyLessons = new Set(difficultyLessons.map(a => a.lesson_id))
  return uniqueDifficultyLessons.size >= requiredCount
}

function checkMaxWpm(attempts: AttemptRecord[], requiredWpm: number): boolean {
  return attempts.some(attempt => attempt.wpm >= requiredWpm)
}

function checkHighAccuracyCount(
  attempts: AttemptRecord[],
  requiredAccuracy: number,
  requiredCount: number
): boolean {
  const highAccuracyAttempts = attempts.filter(attempt => attempt.accuracy >= requiredAccuracy)
  const uniqueLessons = new Set(highAccuracyAttempts.map(a => a.lesson_id))
  return uniqueLessons.size >= requiredCount
}

function checkPerfectAccuracy(attempts: AttemptRecord[], requiredAccuracy: number): boolean {
  return attempts.some(attempt => attempt.accuracy >= requiredAccuracy)
}

function checkStreak(attempts: AttemptRecord[], requiredDays: number): boolean {
  if (attempts.length === 0) return false
  
  // Sort attempts by date (most recent first)
  const sortedAttempts = [...attempts].sort((a, b) => 
    new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  )
  
  // Group attempts by date
  const attemptsByDate = new Map<string, AttemptRecord[]>()
  for (const attempt of sortedAttempts) {
    const date = new Date(attempt.completed_at).toDateString()
    if (!attemptsByDate.has(date)) {
      attemptsByDate.set(date, [])
    }
    attemptsByDate.get(date)!.push(attempt)
  }
  
  // Check for consecutive days
  const dates = Array.from(attemptsByDate.keys()).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )
  
  let currentStreak = 0
  let previousDate: Date | null = null
  
  for (const dateStr of dates) {
    const currentDate = new Date(dateStr)
    
    if (previousDate === null) {
      currentStreak = 1
    } else {
      const daysDiff = Math.floor(
        (previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      if (daysDiff === 1) {
        currentStreak++
      } else {
        break
      }
    }
    
    if (currentStreak >= requiredDays) {
      return true
    }
    
    previousDate = currentDate
  }
  
  return currentStreak >= requiredDays
}

function checkTotalWords(attempts: AttemptRecord[], requiredWords: number): boolean {
  // This is a simplified calculation - in a real app, you'd want to store
  // the actual word count in the attempts table or calculate it from the lesson content
  // For now, we'll estimate based on WPM and assume average attempt duration
  const estimatedWords = attempts.reduce((total, attempt) => {
    // Assume each attempt is roughly 1 minute (this is a rough estimate)
    // In practice, you'd want to store actual duration or word count
    return total + Math.floor(attempt.wpm)
  }, 0)
  
  return estimatedWords >= requiredWords
}

function checkSpecificLesson(
  attempts: AttemptRecord[],
  lessonMap: Map<string, any>,
  lessonTitle: string
): boolean {
  return attempts.some(attempt => {
    const lesson = lessonMap.get(attempt.lesson_id)
    return lesson && lesson.title === lessonTitle
  })
}

function checkSpecificPhrase(attempts: AttemptRecord[], phrase: string): boolean {
  // This would require storing the actual typed text in the attempts
  // For now, we'll just return false as this would need additional data
  // In a real implementation, you'd check the key_press_data or store the typed text
  // You could potentially analyze the key_press_data to reconstruct the typed text
  return false
}
