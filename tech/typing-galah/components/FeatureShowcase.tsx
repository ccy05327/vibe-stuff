import { FiTarget, FiAward, FiBook, FiUsers } from 'react-icons/fi'

export default function FeatureShowcase() {
  const features = [
    {
      icon: FiTarget,
      title: 'Authentic Australian English',
      description: 'Learn with words you actually use. From "colour" to "centre", "ute" to "arvo" - type the way you speak.',
      highlight: 'No more American spelling mistakes!'
    },
    {
      icon: FiBook,
      title: 'Progressive Curriculum',
      description: 'Start with the basics and work your way up through engaging lessons filled with Australian culture and slang.',
      highlight: 'From beginner to typing legend'
    },
    {
      icon: FiAward,
      title: 'Galah Feathers & Achievements',
      description: 'Earn "Galah Feathers" for completing lessons and unlock achievements with fair dinkum Aussie names.',
      highlight: '"You Little Ripper!" badge awaits'
    },
    {
      icon: FiUsers,
      title: 'Built for Aussie Schools',
      description: 'Teacher-friendly platform with class management, progress tracking, and curriculum-aligned content.',
      highlight: 'Coming in Phase 3: "School Mob" edition'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-galah-grey-dark mb-4">
            Why Choose <span className="galah-gradient-text">Typing Galah</span>?
          </h2>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto">
            We're not just another typing platform. We're the first to truly understand what Australian learners need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-galah-pink-soft/20 rounded-full mb-4 group-hover:bg-galah-pink-soft/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-galah-pink-vibrant" />
                </div>
                <h3 className="text-xl font-semibold text-galah-grey-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-galah-grey-mid mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="bg-galah-pink-soft/10 rounded-lg px-3 py-2">
                  <p className="text-sm font-medium text-galah-pink-vibrant">
                    {feature.highlight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Demo Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-galah-grey-dark mb-4">
              See the Difference in Action
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Virtual Keyboard Preview */}
            <div className="card">
              <h4 className="text-xl font-semibold mb-4 text-galah-grey-dark">
                Smart Virtual Keyboard
              </h4>
              <div className="virtual-keyboard">
                <div className="grid grid-cols-10 gap-1 mb-2">
                  {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key, index) => (
                    <div key={key} className={`key h-8 flex items-center justify-center ${index === 4 ? 'key-active' : ''}`}>
                      {key}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-9 gap-1 mb-2 ml-4">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                    <div key={key} className="key h-8 flex items-center justify-center">
                      {key}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 ml-8">
                  {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                    <div key={key} className="key h-8 flex items-center justify-center">
                      {key}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-galah-grey-mid mt-3">
                Highlights the next key to press with proper finger guidance
              </p>
            </div>

            {/* Progress Tracking Preview */}
            <div className="card">
              <h4 className="text-xl font-semibold mb-4 text-galah-grey-dark">
                Progress That Motivates
              </h4>
              <div className="space-y-4">
                <div className="stats-card">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Current WPM</span>
                    <span className="text-2xl font-bold">45</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-galah-grey-dark">🦜 Galah Feathers Earned</span>
                  <span className="achievement-badge">12</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-galah-grey-mid">Home Row Mastery</span>
                    <span className="text-galah-pink-vibrant font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-galah-pink-vibrant h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-galah-grey-mid mt-3">
                Track your progress with motivating Australian-themed rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 