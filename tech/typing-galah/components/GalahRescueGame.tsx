'use client';

import React, { useState, useEffect } from 'react';

// Australian-themed words for the typing game
const WORD_LIST = [
  'galah', 'kookaburra', 'koala', 'kangaroo', 'wombat', 'platypus', 'echidna', 'dingo',
  'emu', 'cockatoo', 'budgie', 'lorikeet', 'possum', 'wallaby', 'quokka', 'tasmanian',
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'darwin', 'canberra', 'outback',
  'billabong', 'boomerang', 'didgeridoo', 'aboriginal', 'uluru', 'kakadu', 'barrier',
  'aussie', 'mate', 'sheila', 'bloke', 'tucker', 'barbie', 'arvo', 'brekkie',
  'dunny', 'thongs', 'ute', 'servo', 'bottle', 'mozzies', 'sunnies', 'fair',
  'eucalyptus', 'wattle', 'bush', 'scrub', 'creek', 'gorge', 'reef', 'desert'
];

interface WordOnScreen {
  id: number;
  word: string;
  x: number;
  y: number;
}

type GameState = 'ready' | 'playing' | 'gameOver';

const GalahRescueGame: React.FC = () => {
  const [wordsOnScreen, setWordsOnScreen] = useState<WordOnScreen[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(5);
  const [gameState, setGameState] = useState<GameState>('ready');



  // Handle input changes and word matching
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Check if the typed value matches any word on screen
    const trimmedValue = newValue.trim().toLowerCase();
    
    if (trimmedValue === '') return; // Don't check for matches on empty input

    // Find if there's a matching word
    const matchingWordIndex = wordsOnScreen.findIndex(
      wordObj => wordObj.word.toLowerCase() === trimmedValue
    );

    // If we found a match
    if (matchingWordIndex !== -1) {
      // Increase score by 1
      setScore(prevScore => prevScore + 1);
      
      // Remove the matched word from wordsOnScreen array
      setWordsOnScreen(prevWords => 
        prevWords.filter((_, index) => index !== matchingWordIndex)
      );
      
      // Clear the input value
      setInputValue('');
    }
  };

  // Reset game to initial state
  const resetGame = () => {
    setWordsOnScreen([]);
    setInputValue('');
    setScore(0);
    setLives(5);
    setGameState('ready');
  };

  // Start game when input is focused or button is clicked
  const startGame = () => {
    if (gameState === 'ready') {
      setGameState('playing');
    }
  };

  // Watch lives and end game when lives reach 0
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('gameOver');
    }
  }, [lives, gameState]);

  // Game loop effect - runs when gameState is 'playing'
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Falling Interval: Move words down every 100ms
    const fallingInterval = setInterval(() => {
      setWordsOnScreen(prevWords => {
        const { stillOnScreen, lostWords } = prevWords.reduce(
          (acc, word) => {
            const newY = word.y + 5; // Move word down by 5 pixels
            
            if (newY >= 500) {
              // Word has fallen past the bottom
              acc.lostWords.push(word);
            } else {
              // Word is still on screen
              acc.stillOnScreen.push({
                ...word,
                y: newY
              });
            }
            return acc;
          },
          { stillOnScreen: [] as WordOnScreen[], lostWords: [] as WordOnScreen[] }
        );

        // Update lives only once per interval for all lost words
        if (lostWords.length > 0) {
          console.log('🔥 Words lost this interval:', lostWords.length, 'words:', lostWords.map(w => w.word));
          setLives(prevLives => {
            const newLives = Math.max(0, prevLives - lostWords.length);
            console.log('💔 Lives update:', prevLives, '->', newLives);
            return newLives;
          });
        }

        return stillOnScreen;
      });
    }, 100);

    // New Word Interval: Add new word every 2 seconds
    const newWordInterval = setInterval(() => {
      const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
      const newWord: WordOnScreen = {
        id: Date.now() + Math.random(), // Unique ID using timestamp + random
        word: randomWord,
        x: Math.random() * 90, // Random horizontal position between 0% and 90%
        y: 0 // Start at the top
      };
      
      setWordsOnScreen(prevWords => [...prevWords, newWord]);
    }, 2000);

    // Cleanup intervals when effect unmounts or gameState changes
    return () => {
      clearInterval(fallingInterval);
      clearInterval(newWordInterval);
    };
  }, [gameState]);

  return (
    <div className="galah-rescue-game w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Galah Rescue Game</h2>
      
      {/* Game Container */}
      <div className="game-container relative h-[500px] border-2 border-gray-300 bg-sky-100 overflow-hidden rounded-lg">
        {/* Score and Lives Display */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="bg-white/90 px-3 py-1 rounded-lg shadow">
            <span className="font-semibold text-lg">Score: {score}</span>
          </div>
          <div className="bg-white/90 px-3 py-1 rounded-lg shadow">
            <span className="font-semibold text-lg">Lives: {lives}</span>
          </div>
        </div>

        {/* Game Status */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white/90 px-3 py-1 rounded-lg shadow">
            <span className="font-semibold text-sm uppercase tracking-wide">
              {gameState}
            </span>
          </div>
        </div>

        {/* Falling Words */}
        {wordsOnScreen.map((wordObj) => (
          <div
            key={wordObj.id}
            className="absolute bg-yellow-300 text-black font-bold px-2 py-1 rounded shadow-md border border-yellow-500"
            style={{
              left: `${wordObj.x}%`,
              top: `${wordObj.y}px`,
            }}
          >
            {wordObj.word}
          </div>
        ))}

        {/* Game Start/End Messages */}
        {gameState === 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <div className="text-white text-center bg-black/80 p-8 rounded-lg border-2 border-green-400">
              <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
              <p className="text-sm mb-4">Save the galahs by typing falling Australian words!</p>
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
              >
                🦜 Start Game
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-2">Game Over!</h3>
              <p className="text-lg mb-4">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>



      {/* Input Field */}
      <div className="mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            gameState === 'ready' 
              ? "Click here or the Start Game button to begin..." 
              : gameState === 'playing' 
                ? "Type the falling words here..." 
                : "Game Over"
          }
          disabled={gameState === 'gameOver'}
          className={`w-full px-4 py-2 border-2 rounded-lg text-lg font-mono focus:outline-none transition-colors ${
            gameState === 'gameOver' 
              ? 'border-gray-300 bg-gray-100 cursor-not-allowed text-gray-500'
              : gameState === 'ready'
                ? 'border-green-400 bg-green-50 focus:border-green-500 cursor-pointer'
                : 'border-blue-400 bg-white focus:border-blue-500'
          }`}
          onFocus={startGame}
          onClick={() => {
            if (gameState === 'ready') {
              startGame();
            }
          }}
        />
      </div>




    </div>
  );
};

export default GalahRescueGame;
