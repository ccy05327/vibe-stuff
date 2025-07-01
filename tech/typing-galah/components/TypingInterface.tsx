'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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

export default function TypingInterface({ lessonText, lessonId, userId, onComplete }: TypingInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [keyPresses, setKeyPresses] = useState<KeyPress[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [correctChars, setCorrectChars] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const errorsSetRef = useRef<Set<number>>(new Set())
  const supabase = createClient()

  // Memoized calculations for better performance
  const stats = useMemo(() => {
    if (!startTime || currentIndex === 0) {
      return { wpm: 0, accuracy: 100 }
    }

    const timeInMinutes = (Date.now() - startTime) / 60000
    const wordsTyped = currentIndex / 5 // Standard: 5 characters = 1 word
    const currentWpm = Math.round(wordsTyped / timeInMinutes) || 0
    const currentAccuracy = Math.round((correctChars / currentIndex) * 100) || 100

    return { wpm: currentWpm, accuracy: currentAccuracy }
  }, [startTime, currentIndex, correctChars])

  // Update timer only
  useEffect(() => {
    if (startTime && !isComplete) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.round((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startTime, isComplete])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyPress = useCallback((char: string) => {
    if (!startTime) {
      setStartTime(Date.now())
    }

    const isCorrect = char === lessonText[currentIndex]
    const keyPress: KeyPress = {
      key: char,
      timestamp: Date.now(),
      correct: isCorrect
    }

    // More efficient array updates
    setKeyPresses(prev => {
      const newArray = [...prev]
      newArray.push(keyPress)
      return newArray
    })

    if (isCorrect) {
      setCorrectChars(prev => prev + 1)
    } else {
      errorsSetRef.current.add(currentIndex)
    }

    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)

    // Check if lesson is complete
    if (newIndex >= lessonText.length) {
      completeLesson([...keyPresses, keyPress])
    }
  }, [currentIndex, lessonText, startTime, keyPresses])

  const completeLesson = useCallback(async (finalKeyPresses: KeyPress[]) => {
    setIsComplete(true)
    
    const finalTimeInMinutes = startTime ? (Date.now() - startTime) / 60000 : 1
    const finalWpm = Math.round((lessonText.length / 5) / finalTimeInMinutes)
    const finalAccuracy = Math.round((correctChars / lessonText.length) * 100)

    const results: TypingResults = {
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeSpent: Math.round((Date.now() - (startTime || 0)) / 1000),
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
  }, [startTime, lessonText.length, correctChars, supabase, userId, lessonId, onComplete])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const expectedLength = currentIndex
    
    // Only allow typing forward, one character at a time
    if (value.length === expectedLength + 1) {
      const newChar = value[expectedLength]
      handleKeyPress(newChar)
      // Clear the input to prevent it from growing
      e.target.value = ''
    }
  }, [currentIndex, handleKeyPress])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent backspace
    if (e.key === 'Backspace') {
      e.preventDefault()
    }
  }

  const resetLesson = useCallback(() => {
    setCurrentIndex(0)
    setStartTime(null)
    setKeyPresses([])
    setIsComplete(false)
    setCorrectChars(0)
    setTimeElapsed(0)
    errorsSetRef.current.clear()
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }, [])

  // Memoized text rendering for better performance
  const renderedText = useMemo(() => {
    return lessonText.split('').map((char, index) => {
      let className = 'char-pending'
      
      if (index < currentIndex) {
        // Check if this character was typed correctly
        const wasCorrect = !errorsSetRef.current.has(index)
        className = wasCorrect ? 'char-correct' : 'char-error'
      } else if (index === currentIndex) {
        className = 'char-current'
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }, [lessonText, currentIndex])

  const getCurrentKey = useCallback(() => {
    if (currentIndex < lessonText.length) {
      return lessonText[currentIndex].toLowerCase()
    }
    return null
  }, [currentIndex, lessonText])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stats */}
      <TypingStats 
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        timeElapsed={timeElapsed}
        progress={(currentIndex / lessonText.length) * 100}
      />

      {/* Typing Area */}
      <div className="typing-area">
        <div className="lesson-text text-xl leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg min-h-[120px]">
          {renderedText}
        </div>

        {/* Hidden input for capturing keystrokes */}
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isComplete}
          className="sr-only"
          placeholder="Start typing..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        <div className="flex justify-center">
          {!isComplete ? (
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
        pressedKeys={Array.from(errorsSetRef.current).map(index => lessonText[index])}
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