import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AchievementsView from '@/components/AchievementsView'

export default async function AchievementsPage() {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-galah-grey-dark mb-2">
            Your <span className="galah-gradient-text">Achievements</span>
          </h1>
          <p className="text-xl text-galah-grey-mid">
            Track your progress and celebrate your typing milestones!
          </p>
        </div>

        {/* Achievements Component */}
        <AchievementsView userId={session.user.id} />
      </div>
    </div>
  )
} 