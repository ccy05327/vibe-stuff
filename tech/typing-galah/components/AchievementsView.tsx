'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import achievementsData from '@/supabase/functions/aware-achievements/_shared/achievements.json'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import PageWrapper from '@/components/utils/PageWrapper'

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

interface UserAchievement {
  achievement_id: string
  achieved_at: string
  achievements?: {
    id: string
    code: string
    name: string
    description: string
  } | {
    id: string
    code: string
    name: string
    description: string
  }[]
}

interface AchievementWithStatus extends Achievement {
  earned: boolean
  earned_at?: string
  progress?: number
  icon: string
}

interface UserStats {
  totalLessons: number
  maxWpm: number
  totalWords: number
  streak: number
  lessonsPerDifficulty: { [key: string]: number }
  highAccuracyLessons: number
  perfectAccuracyLessons: number
  attempts: any[]
}

export default function AchievementsView({ userId }: { userId: string }) {
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  // Achievement icon mapping
  const getAchievementIcon = (achievementId: string): string => {
    const iconMap: { [key: string]: string } = {
      'PROG_01': '🪶', // First Steps
      'PROG_02': '🌿', // Bush Track Graduate
      'PROG_03': '🏜️', // Outback Adventurer
      'PROG_04': '🏆', // True Blue Legend
      'PERF_01': '⚡', // Speedy Galah
      'PERF_02': '🎯', // Accurate Kookaburra
      'PERF_03': '💎', // Flawless Victory
      'CONS_01': '🔥', // Daily Dedication
      'CONS_02': '💪', // Weekly Warrior
      'CONS_03': '📚', // Word Collector
      'SPEC_01': '🏠', // It's the Vibe
      'SPEC_02': '🇦🇺', // Fair Dinkum
    }
    return iconMap[achievementId] || '🎖️'
  }

  const calculateProgress = (achievement: Achievement, stats: UserStats): number => {
    const { criteria } = achievement
    
    // Helper function to safely calculate percentage
    const safePercentage = (current: number, target: number): number => {
      if (target <= 0) return 0
      return Math.min(100, Math.max(0, (current / target) * 100))
    }
    
    switch (criteria.type) {
      case 'total_lessons':
        return safePercentage(stats.totalLessons, criteria.value)
      case 'lessons_by_difficulty':
        const difficultyCount = stats.lessonsPerDifficulty[criteria.difficulty!] || 0
        return safePercentage(difficultyCount, criteria.value)
      case 'max_wpm':
        return safePercentage(stats.maxWpm, criteria.value)
      case 'high_accuracy_count':
        return safePercentage(stats.highAccuracyLessons, criteria.value)
      case 'perfect_accuracy':
        return stats.perfectAccuracyLessons > 0 ? 100 : 0
      case 'streak':
        return safePercentage(stats.streak, criteria.value)
      case 'total_words':
        return safePercentage(stats.totalWords, criteria.value)
      case 'specific_lesson':
        // Check if user has completed the specific lesson
        const hasCompletedLesson = stats.attempts.some(attempt => {
          // This would need lesson title lookup - simplified for now
          return false
        })
        return hasCompletedLesson ? 100 : 0
      default:
        return 0
    }
  }

  const fetchUserStats = async (): Promise<UserStats | null> => {
    try {
      const supabase = createClient()
      
      // Fetch user's lesson attempts
      const { data: attempts, error } = await supabase
        .from('attempts')
        .select('*, lessons(title, lesson_type)')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching user stats:', error)
        return null
      }

      // Calculate stats
      const uniqueLessons = new Set(attempts?.map(a => a.lesson_id) || [])
      const wpmValues = attempts?.map(a => a.wpm) || []
      const maxWpm = wpmValues.length > 0 ? Math.max(...wpmValues) : 0
      const totalWords = attempts?.reduce((sum, a) => sum + Math.floor(a.wpm), 0) || 0
      
      const lessonsPerDifficulty: { [key: string]: number } = {}
      const uniqueLessonsPerDifficulty: { [key: string]: Set<string> } = {}
      
      attempts?.forEach(attempt => {
        if (attempt.lessons?.lesson_type && attempt.lesson_id) {
          const difficulty = attempt.lessons.lesson_type
          if (!uniqueLessonsPerDifficulty[difficulty]) {
            uniqueLessonsPerDifficulty[difficulty] = new Set()
          }
          uniqueLessonsPerDifficulty[difficulty].add(attempt.lesson_id)
        }
      })

      // Convert sets to counts
      Object.keys(uniqueLessonsPerDifficulty).forEach(difficulty => {
        lessonsPerDifficulty[difficulty] = uniqueLessonsPerDifficulty[difficulty].size
      })

      const highAccuracyLessons = new Set(
        attempts?.filter(a => a.accuracy >= 99).map(a => a.lesson_id) || []
      ).size

      const perfectAccuracyLessons = attempts?.filter(a => a.accuracy >= 100).length || 0

      // Calculate streak (simplified)
      const streak = 1 // This would need proper streak calculation

      return {
        totalLessons: uniqueLessons.size,
        maxWpm,
        totalWords,
        streak,
        lessonsPerDifficulty,
        highAccuracyLessons,
        perfectAccuracyLessons,
        attempts: attempts || []
      }
    } catch (error) {
      console.error('Error calculating user stats:', error)
      return null
    }
  }

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const supabase = createClient()
        
        // Fetch user's earned achievements with achievement details
        const { data: userAchievements, error } = await supabase
          .from('user_achievements')
          .select(`
            achievement_id,
            achieved_at,
            achievements (
              id,
              code,
              name,
              description
            )
          `)
          .eq('user_id', userId)

        if (error) {
          console.error('Error fetching user achievements:', error)
          return
        }

        // Fetch user stats for progress calculation
        const stats = await fetchUserStats()
        setUserStats(stats)

        // Create earned achievements map using achievement codes
        const earnedMap = new Map<string, { achieved_at: string }>()
        userAchievements?.forEach(ua => {
          // Handle both single object and array cases
          const achievement = Array.isArray(ua.achievements) ? ua.achievements[0] : ua.achievements
          if (achievement?.code) {
            earnedMap.set(achievement.code, { achieved_at: ua.achieved_at })
          }
        })

        // Transform achievements data
        const allAchievements: AchievementWithStatus[] = achievementsData.map(achievement => {
          const earned = earnedMap.has(achievement.id)
          const progress = stats && !earned ? calculateProgress(achievement, stats) : 0
          
          return {
            ...achievement,
            earned,
            earned_at: earned ? earnedMap.get(achievement.id)?.achieved_at : undefined,
            progress,
            icon: getAchievementIcon(achievement.id)
          }
        })

        setAchievements(allAchievements)
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [userId])

  const categories = ['All', ...new Set(achievementsData.map(a => a.category))]
  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory)

  const earnedCount = achievements.filter(a => a.earned).length
  const totalCount = achievements.length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          
          {/* Achievements skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-galah-pink-vibrant text-white">
            <CardContent>
              <h3 className="text-sm font-medium opacity-90">Total Earned</h3>
              <p className="text-2xl font-bold">{earnedCount}/{totalCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-galah-grey-mid">Completion Rate</h3>
              <p className="text-2xl font-bold text-galah-grey-dark">
                {totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-galah-grey-mid">Max WPM</h3>
              <p className="text-2xl font-bold text-galah-grey-dark">
                {userStats?.maxWpm || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-galah-grey-mid">Lessons Completed</h3>
              <p className="text-2xl font-bold text-galah-grey-dark">
                {userStats?.totalLessons || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="default"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`transition-all duration-200 ${
                achievement.earned
                  ? 'bg-gradient-to-br from-galah-pink-soft/20 to-galah-pink-vibrant/20 border-galah-pink-vibrant/30'
                  : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className={`text-3xl p-3 rounded-full ${
                    achievement.earned ? 'bg-galah-pink-vibrant/20' : 'bg-gray-100'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-base">{achievement.name}</CardTitle>
                      {achievement.earned && (
                        <div className="bg-galah-pink-vibrant text-white text-xs px-2 py-1 rounded-full">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-galah-grey-mid mb-3">
                  {achievement.description}
                </p>
                
                {achievement.earned ? (
                  <div className="text-xs text-galah-pink-vibrant font-medium">
                    Earned {formatDate(achievement.earned_at!)}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-galah-grey-mid">
                      <span>Progress</span>
                      <span>{Math.round(achievement.progress || 0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-galah-pink-vibrant h-2 rounded-full transition-all duration-300"
                        style={{ width: `${achievement.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
} 