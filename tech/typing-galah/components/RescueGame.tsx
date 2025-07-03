'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import PageWrapper from '@/components/utils/PageWrapper'

// Australian-themed word list for the typing game
const WORD_LIST = [
  'mate', 'galah', 'koala', 'kangaroo', 'wombat', 'dingo', 'kookaburra', 'platypus',
  'barbie', 'brekkie', 'arvo', 'servo', 'bottle', 'tinny', 'stubby', 'esky',
  'ute', 'thongs', 'sunnies', 'mozzie', 'bikkie', 'choccy', 'lolly', 'tucker',
  'ripper', 'bonza', 'beaut', 'bloody', 'crikey', 'strewth', 'bloke', 'sheila',
  'dunny', 'billabong', 'bush', 'outback', 'creek', 'scrub', 'joey', 'brolly',
  'cozzie', 'trackie', 'footy', 'cricket', 'surfie', 'lifesaver', 'beach', 'reef',
  'vegemite', 'lamington'
]

type GameState = 'ready' | 'playing' | 'gameOver'

interface WordOnScreen {
  id: number
  word: string
  x: number
  y: number
  speed: number
}

export default function RescueGame() {
  // State variables
  const [wordsOnScreen, setWordsOnScreen] = useState<WordOnScreen[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [lives, setLives] = useState<number>(5)
  const [gameState, setGameState] = useState<GameState>('ready')

  // Game intervals effect - runs when gameState is 'playing'
  useEffect(() => {
    if (gameState !== 'playing') return

    // Falling Interval (every 100ms) - Move words down and check for fallen words
    const fallingInterval = setInterval(() => {
      setWordsOnScreen(prevWords => {
        const updatedWords = prevWords.map(word => ({
          ...word,
          y: word.y + 5 // Move down by 5 pixels
        }))
        
        // Check for words that have fallen below the visible game area
        // Account for input bar height (approximately 80px) so words disappear before reaching input
        const gameAreaHeight = 500 - 100 // 500px container minus input area space
        const wordsStillOnScreen: WordOnScreen[] = []
        let livesLost = 0
        
        for (const word of updatedWords) {
          if (word.y > gameAreaHeight) {
            // Word has fallen off visible area - lose a life
            livesLost++
            console.log(`💔 Lost a life! Word "${word.word}" fell off screen. Lives lost this interval: ${livesLost}`)
          } else {
            // Word is still in visible area
            wordsStillOnScreen.push(word)
          }
        }
        
        // Update lives if any words were lost (one at a time for each word)
        if (livesLost > 0) {
          setLives(prevLives => {
            const newLives = Math.max(0, prevLives - livesLost)
            console.log(`Lives before: ${prevLives}, Lives lost: ${livesLost}, Lives after: ${newLives}`)
            return newLives
          })
        }
        
        return wordsStillOnScreen
      })
    }, 100)

    // New Word Interval (every 2 seconds) - Spawn new words
    const newWordInterval = setInterval(() => {
      const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
      const newWord: WordOnScreen = {
        id: Date.now() + Math.random(), // Unique ID using timestamp + random
        word: randomWord,
        x: Math.floor(Math.random() * 70) + 15, // Random position between 15% and 85% to ensure words stay in bounds
        y: 0, // Start at the top
        speed: 5 // Pixels per interval (can be used for variable speeds later)
      }
      
      setWordsOnScreen(prevWords => [...prevWords, newWord])
    }, 2000)

    // Cleanup function - clear intervals when effect unmounts or gameState changes
    return () => {
      clearInterval(fallingInterval)
      clearInterval(newWordInterval)
    }
  }, [gameState])

  // Monitor lives and trigger game over
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('gameOver')
      setWordsOnScreen([]) // Clear all remaining words
      setInputValue('') // Clear input
    }
  }, [lives, gameState])

  // Handle input change and word matching
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    // Update the input value
    setInputValue(newValue)
    
    // Check if the typed value matches any word on screen
    const trimmedValue = newValue.trim().toLowerCase()
    
    if (trimmedValue) {
      // Find a matching word in the wordsOnScreen array
      const matchedWordIndex = wordsOnScreen.findIndex(word => 
        word.word.toLowerCase() === trimmedValue
      )
      
      if (matchedWordIndex !== -1) {
        // Found a match!
        const matchedWord = wordsOnScreen[matchedWordIndex]
        
        // Increase score by 1
        setScore(prevScore => prevScore + 1)
        
        // Remove the matched word from the wordsOnScreen array
        setWordsOnScreen(prevWords => 
          prevWords.filter(word => word.id !== matchedWord.id)
        )
        
        // Clear the input value
        setInputValue('')
        
        // Optional: Add some visual feedback (you could add this later)
        console.log(`🎉 Rescued a galah! You typed: "${matchedWord.word}"`)
      }
    }
  }

  return (
    <PageWrapper>
      <div className="rescue-game max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-galah-grey-dark mb-6 text-center">
          🦜 Galah Rescue Game
        </h2>
        
        {/* Game State Display */}
        <div className="text-center mb-4">
          {gameState === 'ready' && (
            <p className="text-galah-grey-mid text-lg">
              Ready to rescue some galahs? Type the falling words to save them!
            </p>
          )}
          {gameState === 'playing' && (
            <p className="text-galah-grey-mid text-lg">
              Game in progress... Type fast to save the galahs!
            </p>
          )}
          {gameState === 'gameOver' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <p className="text-red-600 font-bold text-2xl mb-2">
                💔 Game Over!
              </p>
              <p className="text-red-500 text-lg mb-4">
                All the galahs flew away! Better luck next time, mate.
              </p>
              <p className="text-galah-grey-dark text-xl font-semibold">
                Final Score: <span className="text-galah-pink-vibrant">{score}</span> galahs rescued!
              </p>
            </div>
          )}
        </div>

        {/* Main Game Container */}
        <div className="game-container relative h-[500px] border-4 border-galah-pink-vibrant rounded-lg bg-gradient-to-b from-sky-200 to-sky-300 overflow-hidden shadow-lg">
          
          {/* Score and Lives - Top of Container */}
          <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b-2 border-galah-pink-soft p-4 z-10">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-galah-grey-dark">
                Score: <span className="text-galah-pink-vibrant">{score}</span>
              </div>
              <div className="text-xl font-bold text-galah-grey-dark">
                Lives: <span className="text-red-500">
                  {lives > 0 ? '❤️'.repeat(lives) : '💀'}
                </span>
              </div>
            </div>
          </div>

          {/* Game Area - Middle of Container */}
          <div className="absolute top-16 left-0 right-0 bottom-20 p-4">
            {gameState === 'ready' && (
              <div className="flex items-center justify-center h-full">
                <p className="text-galah-grey-dark text-xl font-semibold bg-white/80 px-6 py-3 rounded-lg">
                  Click "Start Game" to begin rescuing galahs!
                </p>
              </div>
            )}
            
            {gameState === 'gameOver' && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center bg-white/90 px-8 py-6 rounded-lg shadow-lg">
                  <div className="text-6xl mb-4">🪦</div>
                  <p className="text-galah-grey-dark text-2xl font-bold mb-2">
                    No More Lives!
                  </p>
                  <p className="text-galah-grey-mid text-lg">
                    You rescued {score} galah{score !== 1 ? 's' : ''} before they all flew away.
                  </p>
                </div>
              </div>
            )}
            
            {/* Falling Words - Only show during gameplay */}
            {gameState === 'playing' && wordsOnScreen.map(word => (
              <div
                key={word.id}
                className="absolute text-lg font-bold text-galah-grey-dark bg-white px-3 py-2 rounded-lg shadow-lg border-2 border-galah-pink-soft hover:scale-105 transition-transform whitespace-nowrap"
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}px`,
                  transform: 'translateX(-50%)',
                  zIndex: 1, // Lower z-index so words appear behind input bar
                  maxWidth: '200px', // Prevent words from being too wide
                  textAlign: 'center'
                }}
              >
                {word.word}
              </div>
            ))}
          </div>

          {/* Input Field - Bottom of Container */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-galah-pink-soft p-4 z-20">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={gameState === 'playing' ? "Type the falling words here..." : "Game not active"}
              className="w-full p-3 border-2 border-galah-pink-soft rounded-lg text-lg font-semibold focus:outline-none focus:border-galah-pink-vibrant focus:ring-2 focus:ring-galah-pink-soft/50 disabled:bg-gray-100"
              disabled={gameState !== 'playing'}
              autoFocus={gameState === 'playing'}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {gameState === 'ready' && (
            <Button
              onClick={() => setGameState('playing')}
              variant="primary"
              size="lg"
            >
              Start Game
            </Button>
          )}
          
          {gameState === 'playing' && (
            <Button
              onClick={() => {
                setGameState('ready')
                setWordsOnScreen([])
                setInputValue('')
              }}
              variant="secondary"
              size="lg"
            >
              Pause Game
            </Button>
          )}
          
          {gameState === 'gameOver' && (
            <Button
              onClick={() => {
                setGameState('ready')
                setScore(0)
                setLives(5)
                setWordsOnScreen([])
                setInputValue('')
              }}
              variant="primary"
              size="lg"
            >
              🦜 Play Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-galah-pink-soft/10 rounded-lg border-2 border-galah-pink-soft/30">
          <h3 className="font-bold text-galah-grey-dark mb-3 text-lg">How to Play:</h3>
          <ul className="text-galah-grey-mid space-y-2">
            <li>• Words will fall from the top of the screen</li>
            <li>• Type the complete word to save the galah and earn points</li>
            <li>• If a word reaches the bottom, you lose a life ❤️</li>
            <li>• Game ends when you run out of lives</li>
            <li>• Fair dinkum Aussie words only!</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}
