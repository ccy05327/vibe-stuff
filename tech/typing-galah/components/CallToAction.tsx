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
            Ready to Type Like a 
            <br />
            <span className="text-galah-off-white">True Blue Aussie?</span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of Australians who are mastering the keyboard with authentic, 
            culturally relevant content. From primary school to professional development, 
            we've got your typing journey covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-galah-pink-vibrant hover:bg-galah-off-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue Your Journey
                </Link>
                <Link 
                  href="/lessons" 
                  className="bg-galah-grey-dark hover:bg-galah-grey-dark/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Explore All Lessons
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signup" 
                  className="bg-white text-galah-pink-vibrant hover:bg-galah-off-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Typing for Free
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-galah-grey-dark hover:bg-galah-grey-dark/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Try Demo Lesson
                </Link>
              </>
            )}
          </div>

          {/* Value propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🆓</div>
              <h3 className="font-semibold text-white mb-1">100% Free to Start</h3>
              <p className="text-white/80 text-sm">No credit card required</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🇦🇺</div>
              <h3 className="font-semibold text-white mb-1">Authentically Australian</h3>
              <p className="text-white/80 text-sm">Made by Aussies, for Aussies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-1">Instant Progress</h3>
              <p className="text-white/80 text-sm">See results from day one</p>
            </div>
          </div>

          {/* Additional encouragement */}
          <div className="mt-12">
            <p className="text-white/90 text-lg italic">
              "Fair dinkum - this is the typing platform Australia has been waiting for!"
            </p>
            <p className="text-white/70 text-sm mt-2">
              Join the typing revolution. Start your journey today. 🦜
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