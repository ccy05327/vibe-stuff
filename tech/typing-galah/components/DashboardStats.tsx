'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { FiTrendingUp, FiTarget, FiClock, FiAward } from 'react-icons/fi'

interface DashboardStatsProps {
  userId: string
}

interface Stats {
  averageWpm: number
  averageAccuracy: number
  totalLessonsCompleted: number
  totalTimeSpent: number
  recentWpm: number
  bestWpm: number
}

export default function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    averageWpm: 0,
    averageAccuracy: 0,
    totalLessonsCompleted: 0,
    totalTimeSpent: 0,
    recentWpm: 0,
    bestWpm: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user attempts
        const { data: attempts, error } = await supabase
          .from('attempts')
          .select('wpm, accuracy, completed_at')
          .eq('user_id', userId)
          .order('completed_at', { ascending: false })

        if (error) {
          console.error('Error fetching stats:', error)
          return
        }

        if (attempts && attempts.length > 0) {
          const totalAttempts = attempts.length
          const totalWpm = attempts.reduce((sum, attempt) => sum + attempt.wpm, 0)
          const totalAccuracy = attempts.reduce((sum, attempt) => sum + attempt.accuracy, 0)
          const recentWpm = attempts[0]?.wpm || 0
          const bestWpm = Math.max(...attempts.map(a => a.wpm))

          setStats({
            averageWpm: Math.round(totalWpm / totalAttempts),
            averageAccuracy: Math.round(totalAccuracy / totalAttempts),
            totalLessonsCompleted: totalAttempts,
            totalTimeSpent: Math.round(totalAttempts * 2.5), // Estimate 2.5 minutes per lesson
            recentWpm,
            bestWpm,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userId, supabase])

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      icon: FiTarget,
      label: 'Average WPM',
      value: stats.averageWpm,
      suffix: 'wpm',
      color: 'text-galah-pink-vibrant',
      bgColor: 'bg-galah-pink-soft/10',
    },
    {
      icon: FiTrendingUp,
      label: 'Best WPM',
      value: stats.bestWpm,
      suffix: 'wpm',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: FiAward,
      label: 'Accuracy',
      value: stats.averageAccuracy,
      suffix: '%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FiClock,
      label: 'Lessons Done',
      value: stats.totalLessonsCompleted,
      suffix: '',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-galah-grey-dark">
          Your Typing Stats
        </h2>
        <div className="text-sm text-galah-grey-mid">
          Last updated: {new Date().toLocaleDateString('en-AU')}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 border-transparent hover:border-galah-pink-soft/30 transition-colors ${stat.bgColor}`}
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${stat.bgColor} mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-galah-grey-mid font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Insights */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-galah-grey-dark mb-1">
              Recent Performance
            </div>
            <div className="text-sm text-galah-grey-mid">
              Latest: <span className="font-medium text-galah-pink-vibrant">{stats.recentWpm} WPM</span>
              {stats.recentWpm > stats.averageWpm ? (
                <span className="text-green-600 ml-2">📈 Above average!</span>
              ) : (
                <span className="text-orange-600 ml-2">Keep practising!</span>
              )}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-galah-grey-dark mb-1">
              Total Practice Time
            </div>
            <div className="text-sm text-galah-grey-mid">
              Approximately <span className="font-medium text-galah-pink-vibrant">{stats.totalTimeSpent} minutes</span>
              <br />
              <span className="text-xs">You're committed to improvement!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 