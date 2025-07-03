'use client'

import { useState } from 'react'
import Link from 'next/link'
import TypingInterface from '@/components/TypingInterface'
import GalahRescueGame from '@/components/GalahRescueGame'

const DEMO_LESSONS = [
  {
    id: 'demo-1',
    title: 'Home Row Heroes',
    content: 'asdf jkl; asdf jkl; add sad fad lad ask dad salad fall fall'
  },
  {
    id: 'demo-2', 
    title: 'Fair Dinkum Phrases',
    content: 'grab some takeaway this arvo and have a barbie in the backyard with mates'
  },
  {
    id: 'demo-3',
    title: 'Aussie Spelling',
    content: 'colour centre favourite realise programme theatre travelled jewellery grey'
  }
]

export default function DemoPage() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [lastResults, setLastResults] = useState<any>(null)

  const handleLessonComplete = (results: any) => {
    setLastResults(results)
    setShowResults(true)
  }

  const nextLesson = () => {
    if (currentLesson < DEMO_LESSONS.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setShowResults(false)
    }
  }

  const resetDemo = () => {
    setCurrentLesson(0)
    setShowResults(false)
    setLastResults(null)
  }

  return (
    <div className="min-h-screen bg-galah-off-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-galah-grey-dark mb-4">
            <span className="galah-gradient-text">Fair Dinkum</span> Demo
          </h1>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto mb-6">
            Experience typing with authentic Australian English. No signup required - just start typing!
          </p>
          
          {/* Demo Navigation */}
          <div className="flex justify-center space-x-4 mb-6">
            {DEMO_LESSONS.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(index)
                  setShowResults(false)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  index === currentLesson
                    ? 'bg-galah-pink-vibrant text-white'
                    : 'bg-white text-galah-grey-dark hover:bg-galah-pink-soft/20'
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </div>

        {/* Results Modal */}
        {showResults && lastResults && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-galah-grey-dark mb-4">
                  You Little Ripper!
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-galah-grey-mid">Speed:</span>
                    <span className="font-bold text-galah-pink-vibrant">{lastResults.wpm} WPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-galah-grey-mid">Accuracy:</span>
                    <span className="font-bold text-galah-pink-vibrant">{lastResults.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-galah-grey-mid">Time:</span>
                    <span className="font-bold text-galah-pink-vibrant">{lastResults.timeSpent}s</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentLesson < DEMO_LESSONS.length - 1 ? (
                    <button
                      onClick={nextLesson}
                      className="w-full btn-primary"
                    >
                      Next Demo Lesson
                    </button>
                  ) : (
                    <button
                      onClick={resetDemo}
                      className="w-full btn-primary"
                    >
                      Try Again
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowResults(false)}
                    className="w-full btn-secondary"
                  >
                    Practice More
                  </button>
                  
                  <Link href="/auth/signup" className="block">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                      Sign Up for Full Access
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing Interface */}
        <TypingInterface
          lessonText={DEMO_LESSONS[currentLesson].content}
          lessonId={DEMO_LESSONS[currentLesson].id}
          userId="demo-user"
          onComplete={handleLessonComplete}
        />

        {/* Typing Games Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-galah-grey-dark mb-4">
              <span className="galah-gradient-text">Typing Games</span>
            </h2>
            <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto mb-6">
              Practice typing with fun, Australian-themed games! Type the falling words to save the galahs.
            </p>
          </div>
          
          <div className="card bg-white">
            <GalahRescueGame />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="card bg-galah-pink-vibrant text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready for the Full Experience?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              This is just a taste! Sign up for free to access 50+ lessons, track your progress, 
              earn achievements, and master Australian typing like a true blue legend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-secondary bg-white text-galah-pink-vibrant hover:bg-galah-off-white">
                Create Free Account
              </Link>
              <Link href="/auth/login" className="text-white hover:text-galah-off-white font-semibold">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-semibold text-galah-grey-dark mb-2">Progress Tracking</h4>
            <p className="text-sm text-galah-grey-mid">See detailed statistics and track your improvement over time</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h4 className="font-semibold text-galah-grey-dark mb-2">Achievements</h4>
            <p className="text-sm text-galah-grey-mid">Earn "Galah Feathers" and unlock fair dinkum achievements</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-3">🎮</div>
            <h4 className="font-semibold text-galah-grey-dark mb-2">Typing Games</h4>
            <p className="text-sm text-galah-grey-mid">Practice with fun, Australian-themed typing games</p>
          </div>
        </div>
      </div>
    </div>
  )
} 