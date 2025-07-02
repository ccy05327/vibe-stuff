import Link from 'next/link'

interface CallToActionProps {
  isAuthenticated: boolean
}

export default function CallToAction({ isAuthenticated }: CallToActionProps) {
  return (
    <section className="py-20 bg-galah-pink-vibrant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Fancy a Go at 
            <br />
            <span className="text-galah-off-white">Aussie Typing?</span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            This little project is here whenever you want to practice typing with words that 
            actually sound like home. No pressure, no ads, just fair dinkum Australian English 
            and a galah who thinks it's pretty neat. 🦜
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-galah-pink-vibrant hover:bg-galah-off-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Back to Typing
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-galah-grey-dark hover:bg-galah-grey-dark/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Try Another Lesson
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/demo" 
                  className="bg-white text-galah-pink-vibrant hover:bg-galah-off-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Give it a Burl!
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-galah-grey-dark hover:bg-galah-grey-dark/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Save Your Progress (Free)
                </Link>
              </>
            )}
          </div>

          {/* Simple features - not commercial */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🆓</div>
              <h3 className="font-semibold text-white mb-1">Always Free</h3>
              <p className="text-white/80 text-sm">Just a passion project</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇦🇺</div>
              <h3 className="font-semibold text-white mb-1">Actually Australian</h3>
              <p className="text-white/80 text-sm">Made by a real Aussie</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🦜</div>
              <h3 className="font-semibold text-white mb-1">Just for Fun</h3>
              <p className="text-white/80 text-sm">No corporate nonsense</p>
            </div>
          </div>

          {/* Personal touch */}
          <div className="mt-12">
            <p className="text-white/90 text-lg">
              "Thought someone should make this, so I did!" 🤷‍♂️
            </p>
            <p className="text-white/70 text-sm mt-2">
              Hope you get a kick out of typing some proper Aussie words for a change.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-4 top-4 text-white/20 text-4xl animate-bounce">
        🦜
      </div>
      <div className="absolute right-4 bottom-4 text-white/20 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>
        🇦🇺
      </div>
    </section>
  )
} 