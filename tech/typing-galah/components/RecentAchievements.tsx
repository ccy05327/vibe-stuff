'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Achievement {
  id: string
  name: string
  description: string
  icon_url: string | null
  achieved_at: string
}

interface AchievementWithIcon extends Achievement {
  icon: string
}

export default function RecentAchievements({ userId }: { userId: string }) {
  const [achievements, setAchievements] = useState<AchievementWithIcon[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    async function fetchRecentAchievements() {
      try {
        const supabase = createClient()
        
        // Fetch user's recent achievements (last 3)
        const { data: userAchievements, error } = await supabase
          .from('user_achievements')
          .select(`
            achievement_id,
            achieved_at,
            achievements (
              id,
              code,
              name,
              description,
              icon_url
            )
          `)
          .eq('user_id', userId)
          .order('achieved_at', { ascending: false })
          .limit(3)

        if (error) {
          console.error('Error fetching achievements:', error)
          return
        }

        // Transform the data
        const recentAchievements: AchievementWithIcon[] = userAchievements?.map(ua => {
          // Handle both single object and array cases
          const achievement = Array.isArray(ua.achievements) ? ua.achievements[0] : ua.achievements
          return {
            id: achievement?.code || '',
            name: achievement?.name || '',
            description: achievement?.description || '',
            icon_url: achievement?.icon_url || null,
            achieved_at: ua.achieved_at,
            icon: getAchievementIcon(achievement?.code || '')
          }
        }).filter(a => a.id) || []

        setAchievements(recentAchievements)
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentAchievements()
  }, [userId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-galah-pink-soft/5 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🎖️</div>
              <p className="text-galah-grey-mid text-sm">
                No achievements yet!
              </p>
              <p className="text-galah-grey-mid text-xs mt-1">
                Start typing to earn your first achievement
              </p>
            </div>
          ) : (
            achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-galah-pink-soft/5 rounded-lg border-l-4 border-galah-pink-vibrant">
                <div className="text-2xl bg-white rounded-full p-2 shadow-sm">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-galah-grey-dark text-sm">
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-galah-grey-mid">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-galah-pink-vibrant mt-1 font-medium">
                    {formatDate(achievement.achieved_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 text-center">
          <Link href="/achievements">
            <Button variant="secondary" size="default">
              View All Achievements
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 