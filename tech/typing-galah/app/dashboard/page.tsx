import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import DashboardStats from '@/components/DashboardStats'
import LessonProgress from '@/components/LessonProgress'
import RecentAchievements from '@/components/RecentAchievements'
import QuickStart from '@/components/QuickStart'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-galah-off-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-galah-grey-dark mb-2">
            G'day, <span className="galah-gradient-text">{session.user.user_metadata?.username || 'Mate'}</span>!
          </h1>
          <p className="text-xl text-galah-grey-mid">
            Ready to improve your typing skills with some fair dinkum practice?
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <DashboardStats userId={session.user.id} />

            {/* Lesson Progress */}
            <LessonProgress userId={session.user.id} />

            {/* Quick Start */}
            <QuickStart />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <RecentAchievements userId={session.user.id} />

            {/* Motivational Quote */}
            <div className="card bg-galah-pink-vibrant text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🦜</div>
                <blockquote className="text-lg font-medium mb-4">
                  "She'll be right, mate! Every expert was once a beginner."
                </blockquote>
                <p className="text-sm opacity-90">
                  - Galah's Daily Wisdom
                </p>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="card">
              <h3 className="text-lg font-semibold text-galah-grey-dark mb-4">
                Today's Goal 🎯
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-galah-grey-mid">Practice Time</span>
                  <span className="text-galah-pink-vibrant font-medium">12 / 15 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-galah-pink-vibrant h-3 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-sm text-galah-grey-mid">
                  Just 3 more minutes to hit your daily goal! You're doing bonza!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 