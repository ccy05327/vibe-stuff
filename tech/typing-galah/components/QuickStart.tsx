import Link from 'next/link'
import { FiPlay, FiBookOpen, FiZap, FiTarget } from 'react-icons/fi'

export default function QuickStart() {
  const quickStartOptions = [
    {
      icon: FiPlay,
      title: 'Continue Lesson',
      description: 'Pick up where you left off',
      link: '/lessons/current',
      color: 'bg-galah-pink-vibrant',
      textColor: 'text-white',
    },
    {
      icon: FiBookOpen,
      title: 'New Lesson',
      description: 'Start a fresh typing lesson',
      link: '/lessons',
      color: 'bg-blue-500',
      textColor: 'text-white',
    },
    {
      icon: FiZap,
      title: 'Play Game',
      description: 'Practice with typing games',
      link: '/games',
      color: 'bg-green-500',
      textColor: 'text-white',
    },
    {
      icon: FiTarget,
      title: 'Custom Practice',
      description: 'Focus on problem keys',
      link: '/practice/custom',
      color: 'bg-purple-500',
      textColor: 'text-white',
    },
  ]

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-galah-grey-dark mb-4">
        Quick Start
      </h2>
      <p className="text-galah-grey-mid mb-6">
        Jump right into practicing! Choose what feels right for your mood today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStartOptions.map((option, index) => (
          <Link
            key={index}
            href={option.link}
            className="block group"
          >
            <div className={`${option.color} rounded-lg p-6 text-center ${option.textColor} transform transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-lg`}>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <option.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {option.title}
              </h3>
              <p className="text-sm opacity-90">
                {option.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-galah-pink-soft/10 border border-galah-pink-soft/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🦜</div>
          <div>
            <h4 className="font-semibold text-galah-grey-dark mb-1">
              Galah's Suggestion
            </h4>
            <p className="text-sm text-galah-grey-mid">
              Based on your progress, try focusing on{' '}
              <span className="font-medium text-galah-pink-vibrant">Home Row Mastery</span>{' '}
              today. Your accuracy has been bonza, but speed could use a boost!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 