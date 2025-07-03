'use client'

import { useState, useEffect } from 'react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export default function AchievementNotification({ 
  achievement, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Show notification with animation
    setTimeout(() => setIsVisible(true), 100)

    // Auto close if enabled
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-galah-pink-vibrant/20 p-4 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="text-lg">🎉</div>
            <span className="text-sm font-semibold text-galah-pink-vibrant">
              Achievement Unlocked!
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-galah-grey-mid hover:text-galah-grey-dark transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Achievement Content */}
        <div className="flex items-start space-x-3">
          <div className="text-3xl bg-galah-pink-vibrant/10 p-3 rounded-full">
            {achievement.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-galah-grey-dark mb-1">
              {achievement.name}
            </h3>
            <p className="text-sm text-galah-grey-mid">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* Australian celebration text */}
        <div className="mt-3 text-center">
          <p className="text-xs text-galah-pink-vibrant font-medium">
            🦜 You little beauty! Fair dinkum legend! 🦜
          </p>
        </div>

        {/* Progress bar for auto-close */}
        {autoClose && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-galah-pink-vibrant h-1 rounded-full transition-all ease-linear"
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

// Achievement notification manager component
export function AchievementNotificationManager() {
  const [notifications, setNotifications] = useState<Array<Achievement & { uniqueId: string }>>([])

  // Function to add a new notification
  const addNotification = (achievement: Achievement) => {
    const uniqueId = `${achievement.id}-${Date.now()}`
    setNotifications(prev => [...prev, { ...achievement, uniqueId }])
  }

  // Function to remove a notification
  const removeNotification = (uniqueId: string) => {
    setNotifications(prev => prev.filter(n => n.uniqueId !== uniqueId))
  }

  // Expose the addNotification function globally
  useEffect(() => {
    (window as any).showAchievementNotification = addNotification
    return () => {
      delete (window as any).showAchievementNotification
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {notifications.map((notification, index) => (
        <div
          key={notification.uniqueId}
          className="pointer-events-auto"
          style={{
            position: 'absolute',
            top: `${20 + index * 120}px`,
            right: '20px'
          }}
        >
          <AchievementNotification
            achievement={notification}
            onClose={() => removeNotification(notification.uniqueId)}
          />
        </div>
      ))}
    </div>
  )
} 