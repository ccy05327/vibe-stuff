'use client'

import { useState } from 'react'

// Sample achievements for testing
const testAchievements = [
  {
    id: 'PROG_01',
    name: 'First Steps',
    description: 'Complete your very first lesson. Welcome to the mob!',
    icon: '🪶'
  },
  {
    id: 'PERF_01',
    name: 'Speedy Galah',
    description: 'Reach a typing speed of 70 WPM on any lesson.',
    icon: '⚡'
  },
  {
    id: 'PERF_03',
    name: 'Flawless Victory',
    description: 'Get a perfect 100% accuracy on any lesson. Not a single typo!',
    icon: '💎'
  },
  {
    id: 'SPEC_02',
    name: 'Fair Dinkum',
    description: 'Successfully type the phrase "fair dinkum" without any errors.',
    icon: '🇦🇺'
  }
]

export default function TestAchievements() {
  const [notificationCount, setNotificationCount] = useState(0)

  const triggerNotification = () => {
    const achievement = testAchievements[notificationCount % testAchievements.length]
    
    // Call the global notification function
    if (typeof window !== 'undefined' && (window as any).showAchievementNotification) {
      (window as any).showAchievementNotification(achievement)
      setNotificationCount(prev => prev + 1)
    } else {
      alert('Notification system not ready yet. Try refreshing the page.')
    }
  }

  return (
    <div className="card max-w-md">
      <h3 className="text-lg font-semibold text-galah-grey-dark mb-4">
        🧪 Test Achievements
      </h3>
      <p className="text-sm text-galah-grey-mid mb-4">
        Click the button below to test achievement notifications!
      </p>
      <button
        onClick={triggerNotification}
        className="w-full btn-primary"
      >
        🎉 Trigger Achievement Notification
      </button>
      <p className="text-xs text-galah-grey-mid mt-2 text-center">
        Notifications triggered: {notificationCount}
      </p>
    </div>
  )
} 