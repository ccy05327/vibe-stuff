import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import HeroSection from '@/components/HeroSection'
import FeatureShowcase from '@/components/FeatureShowcase'
import ProjectStorySection from '@/components/TestimonialSection'
import CallToAction from '@/components/CallToAction'

export default async function HomePage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection isAuthenticated={!!session} />

      {/* Project Story - Why This Exists */}
      <ProjectStorySection />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Australian English Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-galah-grey-dark mb-4">
              See the <span className="galah-gradient-text">Difference?</span>
            </h2>
            <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto">
              Here's what I mean about typing sites using words that don't feel right to Aussie fingers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-red-600">
                😵‍💫 Other Typing Sites
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-galah-grey-dark">
                    "The <span className="font-bold text-red-600">color</span> of the{' '}
                    <span className="font-bold text-red-600">gray</span> truck was bright."
                  </p>
                  <p className="text-xs text-red-600 mt-1">Feels wrong, right?</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-galah-grey-dark">
                    "Let's get <span className="font-bold text-red-600">takeout</span> for lunch."
                  </p>
                  <p className="text-xs text-red-600 mt-1">We don't say that!</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-galah-grey-dark">
                    "I love eating <span className="font-bold text-red-600">cookies</span> and{' '}
                    <span className="font-bold text-red-600">candy</span>."
                  </p>
                  <p className="text-xs text-red-600 mt-1">Nah mate...</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-galah-pink-vibrant">
                😌 Typing Galah
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-galah-grey-dark">
                    "The <span className="font-bold text-galah-pink-vibrant">colour</span> of the{' '}
                    <span className="font-bold text-galah-pink-vibrant">grey</span> ute was bright."
                  </p>
                  <p className="text-xs text-galah-pink-vibrant mt-1">Much better!</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-galah-grey-dark">
                    "Let's grab some <span className="font-bold text-galah-pink-vibrant">takeaway</span> this{' '}
                    <span className="font-bold text-galah-pink-vibrant">arvo</span>."
                  </p>
                  <p className="text-xs text-galah-pink-vibrant mt-1">Now you're talking!</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-galah-grey-dark">
                    "I love eating <span className="font-bold text-galah-pink-vibrant">bikkies</span> and{' '}
                    <span className="font-bold text-galah-pink-vibrant">lollies</span>."
                  </p>
                  <p className="text-xs text-galah-pink-vibrant mt-1">Perfect! 🇦🇺</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-galah-grey-mid">
              <span className="text-2xl">🦜</span> It's a small thing, but it makes typing practice so much more natural!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction isAuthenticated={!!session} />
    </div>
  )
} 