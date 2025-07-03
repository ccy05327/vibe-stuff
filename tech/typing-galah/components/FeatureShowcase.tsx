import { FiTarget, FiAward, FiBook, FiHeart } from 'react-icons/fi'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function FeatureShowcase() {
  const features = [
    {
      icon: FiTarget,
      title: 'Actually Australian English',
      description: 'Type with words you really use. "Colour", "centre", "ute", "arvo" - finally feels natural!',
      highlight: 'No more cringing at "color"!'
    },
    {
      icon: FiBook,
      title: 'Real Aussie Content',
      description: 'Practice with sentences about barbies, servo stops, and weekend arvos. Typing lessons that don\'t feel foreign.',
      highlight: 'From basic words to full-blown slang'
    },
    {
      icon: FiAward,
      title: 'Galah Feathers & Fun',
      description: 'Earn "Galah Feathers" and get achievements with proper Aussie names like "You Little Ripper!"',
      highlight: 'Because boring badges are un-Australian'
    },
    {
      icon: FiHeart,
      title: 'Made with Care',
      description: 'Simple, clean interface focused on learning. No ads, no premium upsells, just good old-fashioned typing practice.',
      highlight: 'It\'s a passion project, not a business'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-galah-grey-dark mb-4">
            What Makes It <span className="galah-gradient-text">Special?</span>
          </h2>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto">
            Just a few things I thought would make typing practice better for us Aussies
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
              How It Works
            </h3>
            <p className="text-galah-grey-mid">Nothing fancy, just good typing practice with a distinctly Australian flavour</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Virtual Keyboard Preview */}
            <Card isHoverable>
              <CardHeader>
                <CardTitle>Virtual Keyboard Helper</CardTitle>
              </CardHeader>
              <CardContent>
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
                  Shows you which key to press next (if you want the help!)
                </p>
              </CardContent>
            </Card>

            {/* Progress Tracking Preview */}
            <Card isHoverable>
              <CardHeader>
                <CardTitle>Track Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="stats-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Words per Minute</span>
                      <span className="text-2xl font-bold">45</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-galah-grey-dark">🦜 Galah Feathers</span>
                    <span className="achievement-badge">12</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-galah-grey-mid">Progress</span>
                      <span className="text-galah-pink-vibrant font-medium">Getting there!</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-galah-pink-vibrant h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-galah-grey-mid mt-3">
                  Simple stats and a few fun rewards to keep you motivated
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 