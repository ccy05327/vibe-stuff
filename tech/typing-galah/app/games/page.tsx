'use client'

import GalahRescueGame from '@/components/GalahRescueGame'
import { useAuth } from '@/components/AuthProvider'
import Link from 'next/link'

export default function GamesPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-galah-off-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-galah-grey-dark mb-4">
            <span className="galah-gradient-text">Typing Games</span>
          </h1>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto mb-6">
            Practice your typing skills with fun, Australian-themed games! 
            {!user && ' Sign up to track your high scores and compete with other players.'}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Galah Rescue Game */}
          <div className="card bg-white">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-galah-grey-dark mb-2">
                🦜 Galah Rescue
              </h3>
              <p className="text-galah-grey-mid">
                Save the galahs by typing falling Australian words before they hit the ground!
              </p>
            </div>
            <GalahRescueGame />
          </div>

          {/* Placeholder for more games */}
          <div className="card bg-white">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-galah-grey-dark mb-2">
                More Games Coming Soon!
              </h3>
              <p className="text-galah-grey-mid mb-6">
                We're working on more Australian-themed typing games. 
                Got any suggestions?
              </p>
              <div className="text-sm text-galah-grey-mid">
                <div className="mb-2">🎯 <strong>Word Shooter:</strong> Blast words with your typing speed</div>
                <div className="mb-2">🏃 <strong>Typing Race:</strong> Race against time and other players</div>
                <div className="mb-2">🧩 <strong>Word Puzzles:</strong> Solve Australian crosswords by typing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action for non-authenticated users */}
        {!user && (
          <div className="card bg-galah-pink-vibrant text-white max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Want to Track Your High Scores?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Sign up for free to save your progress, compete with other players, 
              and unlock achievements as you master Australian typing!
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
        )}

        {/* Navigation */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-secondary">
              Try Demo Lessons
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="btn-secondary">
                  Back to Dashboard
                </Link>
                <Link href="/lessons" className="btn-secondary">
                  Practice Lessons
                </Link>
              </>
            )}
            {!user && (
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 