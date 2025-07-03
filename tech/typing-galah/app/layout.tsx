import './globals.css'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { AchievementNotificationManager } from '@/components/AchievementNotification'

export const metadata = {
  title: 'Typing Galah | Australia\'s Own Touch Typing Platform',
  description: 'Learn to type with authentic Australian English. Fair dinkum typing lessons that speak your language.',
  keywords: 'typing, Australia, Australian English, touch typing, keyboard, learn typing, galah',
  authors: [{ name: 'Typing Galah Team' }],
  creator: 'Typing Galah',
  openGraph: {
    title: 'Typing Galah | Australia\'s Own Touch Typing Platform',
    description: 'Learn to type with authentic Australian English. Fair dinkum typing lessons that speak your language.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en-AU" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="h-full font-inter antialiased">
        <AuthProvider session={session}>
          <div className="min-h-full">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-white border-t border-gray-200 mt-auto">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-galah-grey-mid text-sm">
                    &copy; 2025 Typing Galah. A fair dinkum Australian typing platform.
                  </p>
                  <p className="text-galah-grey-mid text-xs mt-2">
                    Built with ❤️ for Australia 🇦🇺
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <AchievementNotificationManager />
        </AuthProvider>
      </body>
    </html>
  )
} 