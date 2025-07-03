import Link from 'next/link'
import Button from '@/components/ui/Button'

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
            <span className="galah-gradient-text">Typing Galah</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl">Fair Dinkum Typing Practice</span>
          </h1>

          {/* Personal Introduction */}
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-xl sm:text-2xl text-galah-grey-mid leading-relaxed mb-4">
              G'day! 👋 I got sick of typing "color" and "theater" on those American sites, 
              so I made this little project for us Aussies.
            </p>
            <p className="text-lg text-galah-grey-mid leading-relaxed">
              Finally, a place to practice typing with proper Australian English - 
              "colour", "arvo", "servo", and all the words we actually use!
            </p>
          </div>

          {/* Australian Slang Preview */}
          <div className="inline-block bg-white rounded-lg p-4 shadow-md mb-8 border border-galah-pink-soft/20">
            <p className="font-mono text-lg text-galah-grey-dark">
              "Let's grab some <span className="text-galah-pink-vibrant font-bold">takeaway</span> this{' '}
              <span className="text-galah-pink-vibrant font-bold">arvo</span> and have a{' '}
              <span className="text-galah-pink-vibrant font-bold">barbie</span> in the backyard!"
            </p>
            <p className="text-sm text-galah-grey-mid mt-2">
              🦜 Practice typing with words you actually say
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="primary" size="lg">
                    Keep Practicing
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="secondary" size="lg">
                    Try a Quick Lesson
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="primary" size="lg" href="/demo">
                  Give it a Burl! 
                </Button>
                <Button variant="secondary" size="lg" href="/auth/signup">
                  Create Account (Free)
                </Button>
              </>
            )}
          </div>

          {/* Project Stats - More Personal */}
          <div className="text-center">
            <p className="text-sm text-galah-grey-mid mb-4">
              A passion project for fellow Aussies who are tired of American typing sites 🇦🇺
            </p>
            <div className="flex justify-center items-center space-x-8 text-galah-grey-mid">
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">100%</div>
                <div className="text-sm">Australian English</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">Made</div>
                <div className="text-sm">For Fun</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-galah-pink-vibrant">No</div>
                <div className="text-sm">American Spelling</div>
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