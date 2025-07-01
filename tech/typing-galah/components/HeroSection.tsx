import Link from 'next/link'

interface HeroSectionProps {
  isAuthenticated: boolean
}

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative bg-galah-off-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-galah-grey-dark mb-6">
            <span className="galah-gradient-text">Fair Dinkum</span>
            <br />
            Typing Lessons
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl sm:text-2xl text-galah-grey-mid max-w-4xl mx-auto mb-8 leading-relaxed">
            Learn to type with authentic Australian English. 
            From "colour" to "arvo", master the keyboard while speaking your language.
          </p>

          {/* Australian Slang Preview */}
          <div className="inline-block bg-white rounded-lg p-4 shadow-md mb-8 border border-galah-pink-soft/20">
            <p className="font-mono text-lg text-galah-grey-dark">
              "Let's grab some <span className="text-galah-pink-vibrant font-bold">takeaway</span> this{' '}
              <span className="text-galah-pink-vibrant font-bold">arvo</span> and have a{' '}
              <span className="text-galah-pink-vibrant font-bold">barbie</span> in the backyard!"
            </p>
            <p className="text-sm text-galah-grey-mid mt-2">
              🇦🇺 Practise typing with real Aussie phrases
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
                  Continue Learning
                </Link>
                <Link href="/lessons" className="btn-secondary text-lg px-8 py-4">
                  Browse Lessons
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                  Start Typing for Free
                </Link>
                <Link href="/demo" className="btn-secondary text-lg px-8 py-4">
                  Try Demo Lesson
                </Link>
              </>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-galah-grey-mid mb-4">
              Trusted by students, teachers, and typing enthusiasts across Australia
            </p>
            <div className="flex justify-center items-center space-x-8 text-galah-grey-mid">
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">500+</div>
                <div className="text-sm">Aussie Phrases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">50+</div>
                <div className="text-sm">Typing Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">100%</div>
                <div className="text-sm">Australian</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse-galah">
        🦜
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse-galah">
        🇦🇺
      </div>
      <div className="absolute top-1/2 left-4 text-3xl opacity-10">
        🌿
      </div>
      <div className="absolute top-1/3 right-4 text-3xl opacity-10">
        🌿
      </div>
    </section>
  )
} 