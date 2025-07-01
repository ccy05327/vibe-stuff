'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useState } from 'react'
// Temporarily commenting out react-icons to test
// import { FiBars, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-galah-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦜</span>
              </div>
              <span className="text-xl font-bold galah-gradient-text">
                Typing Galah
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {user && (
                <>
                  <Link href="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link href="/lessons" className="nav-link">
                    Lessons
                  </Link>
                  <Link href="/games" className="nav-link">
                    Games
                  </Link>
                  <Link href="/progress" className="nav-link">
                    Progress
                  </Link>
                </>
              )}
              <Link href="/about" className="nav-link">
                About
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-galah-grey-dark hover:text-galah-pink-vibrant transition-colors"
                >
                  <div className="w-8 h-8 bg-galah-pink-soft rounded-full flex items-center justify-center">
                    {/* <FiUser className="w-4 h-4 text-white" /> */}
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <span className="hidden md:block font-medium">
                    {user.email?.split('@')[0]}
                  </span>
                </button>

                {/* User dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-galah-grey-dark hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {/* <FiUser className="w-4 h-4 mr-2" /> */}
                      👤 Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-galah-grey-dark hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {/* <FiSettings className="w-4 h-4 mr-2" /> */}
                      ⚙️ Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-galah-grey-dark hover:bg-gray-50"
                    >
                      {/* <FiLogOut className="w-4 h-4 mr-2" /> */}
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth/login" className="nav-link">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <span className="text-xl">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/lessons"
                  className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lessons
                </Link>
                <Link
                  href="/games"
                  className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  href="/progress"
                  className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progress
                </Link>
                <hr className="my-2" />
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-3 py-2 text-base font-medium bg-galah-pink-vibrant text-white rounded-md hover:bg-galah-pink-soft transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-galah-grey-dark hover:text-galah-pink-vibrant hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 