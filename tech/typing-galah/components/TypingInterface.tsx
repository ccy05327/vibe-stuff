'use client'

import { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react'
import { createClient } from '@/lib/supabase'
import VirtualKeyboard from './VirtualKeyboard'
import TypingStats from './TypingStats'

interface TypingInterfaceProps {
  lessonText: string
  lessonId: string
  userId: string
  onComplete?: (results: TypingResults) => void
}

interface TypingResults {
  wpm: number
  accuracy: number
  timeSpent: number
  keyPressData: KeyPress[]
}

interface KeyPress {
  key: string
  timestamp: number
  correct: boolean
}

// State interface for useReducer
interface TypingState {
  currentIndex: number
  startTime: number | null
  keyPresses: KeyPress[]
  isComplete: boolean
  correctChars: number
  timeElapsed: number
  errors: Set<number>
}

// Action types for useReducer
type TypingAction = 
  | { type: 'START_TYPING'; timestamp: number }
  | { type: 'KEY_PRESS'; payload: { char: string; timestamp: number; isCorrect: boolean; newIndex: number } }
  | { type: 'UPDATE_TIME'; timeElapsed: number }
  | { type: 'COMPLETE_LESSON' }
  | { type: 'RESET_LESSON' }

// Reducer for better state management
function typingReducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case 'START_TYPING':
      return {
        ...state,
        startTime: action.timestamp
      }
    
    case 'KEY_PRESS':
      const { char, timestamp, isCorrect, newIndex } = action.payload
      const newKeyPress: KeyPress = { key: char, timestamp, correct: isCorrect }
      
      // Use more efficient array update
      const newKeyPresses = state.keyPresses.length < 1000 
        ? [...state.keyPresses, newKeyPress]
        : state.keyPresses.concat(newKeyPress)
      
      const newErrors = new Set(state.errors)
      if (!isCorrect) {
        newErrors.add(state.currentIndex)
      }
      
      return {
        ...state,
        currentIndex: newIndex,
        keyPresses: newKeyPresses,
        correctChars: isCorrect ? state.correctChars + 1 : state.correctChars,
        errors: newErrors
      }
    
    case 'UPDATE_TIME':
      return {
        ...state,
        timeElapsed: action.timeElapsed
      }
    
    case 'COMPLETE_LESSON':
      return {
        ...state,
        isComplete: true
      }
    
    case 'RESET_LESSON':
      return {
        currentIndex: 0,
        startTime: null,
        keyPresses: [],
        isComplete: false,
        correctChars: 0,
        timeElapsed: 0,
        errors: new Set()
      }
    
    default:
      return state
  }
}

export default function TypingInterface({ lessonText, lessonId, userId, onComplete }: TypingInterfaceProps) {
  const [state, dispatch] = useReducer(typingReducer, {
    currentIndex: 0,
    startTime: null,
    keyPresses: [],
    isComplete: false,
    correctChars: 0,
    timeElapsed: 0,
    errors: new Set<number>()
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Memoized calculations for better performance - only recalculate when necessary
  const stats = useMemo(() => {
    if (!state.startTime || state.currentIndex === 0) {
      return { wpm: 0, accuracy: 100 }
    }

    const timeInMinutes = (Date.now() - state.startTime) / 60000
    const wordsTyped = state.currentIndex / 5 // Standard: 5 characters = 1 word
    const currentWpm = Math.round(wordsTyped / timeInMinutes) || 0
    const currentAccuracy = Math.round((state.correctChars / state.currentIndex) * 100) || 100

    return { wpm: currentWpm, accuracy: currentAccuracy }
  }, [state.startTime, state.currentIndex, state.correctChars])

  // Update timer with better performance
  useEffect(() => {
    if (state.startTime && !state.isComplete) {
      const interval = setInterval(() => {
        dispatch({ 
          type: 'UPDATE_TIME', 
          timeElapsed: Math.round((Date.now() - state.startTime!) / 1000) 
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [state.startTime, state.isComplete])

  // Focus container on mount for better keyboard capture
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  // Direct keyboard event handling for better performance
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default browser behavior
    e.preventDefault()
    
    // Ignore modifier keys and special keys
    if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
      return
    }

    // Ignore if lesson is complete
    if (state.isComplete) {
      return
    }

    const char = e.key
    const timestamp = Date.now()

    // Start timing on first keystroke
    if (!state.startTime) {
      dispatch({ type: 'START_TYPING', timestamp })
    }

    const isCorrect = char === lessonText[state.currentIndex]
    const newIndex = state.currentIndex + 1

    // Single state update for better performance
    dispatch({
      type: 'KEY_PRESS',
      payload: { char, timestamp, isCorrect, newIndex }
    })

    // Check if lesson is complete
    if (newIndex >= lessonText.length) {
      dispatch({ type: 'COMPLETE_LESSON' })
      
      // Complete lesson with final data
      setTimeout(() => {
        completeLesson([...state.keyPresses, { key: char, timestamp, correct: isCorrect }])
      }, 0)
    }
  }, [state.currentIndex, state.startTime, state.isComplete, state.keyPresses, lessonText])

  // Add/remove keyboard event listener
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const completeLesson = useCallback(async (finalKeyPresses: KeyPress[]) => {
    const finalTimeInMinutes = state.startTime ? (Date.now() - state.startTime) / 60000 : 1
    const finalWpm = Math.round((lessonText.length / 5) / finalTimeInMinutes)
    const finalAccuracy = Math.round((state.correctChars / lessonText.length) * 100)

    const results: TypingResults = {
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeSpent: Math.round((Date.now() - (state.startTime || 0)) / 1000),
      keyPressData: finalKeyPresses
    }

    // Save to database
    try {
      await supabase.from('attempts').insert({
        user_id: userId,
        lesson_id: lessonId,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        key_press_data: finalKeyPresses
      })
    } catch (error) {
      console.error('Error saving attempt:', error)
    }

    onComplete?.(results)
  }, [state.startTime, lessonText.length, state.correctChars, supabase, userId, lessonId, onComplete])

  const resetLesson = useCallback(() => {
    dispatch({ type: 'RESET_LESSON' })
    containerRef.current?.focus()
  }, [])

  // Memoized text rendering for better performance
  const renderedText = useMemo(() => {
    return lessonText.split('').map((char, index) => {
      let className = 'char-pending'
      
      if (index < state.currentIndex) {
        // Check if this character was typed correctly
        const wasCorrect = !state.errors.has(index)
        className = wasCorrect ? 'char-correct' : 'char-error'
      } else if (index === state.currentIndex) {
        className = 'char-current'
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }, [lessonText, state.currentIndex, state.errors])

  const getCurrentKey = useCallback(() => {
    if (state.currentIndex < lessonText.length) {
      return lessonText[state.currentIndex].toLowerCase()
    }
    return null
  }, [state.currentIndex, lessonText])

  return (
    <div 
      ref={containerRef}
      className="max-w-4xl mx-auto space-y-6 outline-none"
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {/* Stats */}
      <TypingStats 
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        timeElapsed={state.timeElapsed}
        progress={(state.currentIndex / lessonText.length) * 100}
      />

      {/* Typing Area */}
      <div className="typing-area">
        <div className="lesson-text text-xl leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg min-h-[120px]">
          {renderedText}
        </div>

        <div className="flex justify-center">
          {!state.isComplete ? (
            <p className="text-galah-grey-mid text-center">
              Click here and start typing! 
              <span className="block text-sm mt-1">
                Type: <span className="font-mono bg-galah-pink-soft/20 px-2 py-1 rounded">
                  {getCurrentKey() || 'Complete!'}
                </span>
              </span>
            </p>
          ) : (
            <div className="text-center">
              <div className="text-2xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-galah-grey-dark mb-2">
                You Little Ripper!
              </h3>
              <p className="text-galah-grey-mid mb-4">
                Lesson completed with {stats.wpm} WPM and {stats.accuracy}% accuracy!
              </p>
              <button
                onClick={resetLesson}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Virtual Keyboard */}
      <VirtualKeyboard 
        currentKey={getCurrentKey()}
        pressedKeys={Array.from(state.errors).map(index => lessonText[index])}
      />

      {/* Instructions */}
      <div className="card bg-galah-pink-soft/10">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🦜</div>
          <div>
            <h4 className="font-semibold text-galah-grey-dark mb-2">
              Galah's Tips
            </h4>
            <ul className="text-sm text-galah-grey-mid space-y-1">
              <li>• Focus on accuracy first, speed will come naturally</li>
              <li>• Use proper finger placement on the home row keys</li>
              <li>• Don't look at the keyboard - trust your muscle memory</li>
              <li>• Take breaks if your hands get tired</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 