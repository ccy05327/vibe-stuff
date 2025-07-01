interface TypingStatsProps {
  wpm: number
  accuracy: number
  timeElapsed: number
  progress: number
}

export default function TypingStats({ wpm, accuracy, timeElapsed, progress }: TypingStatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getAccuracyColor = (acc: number) => {
    if (acc >= 95) return 'text-green-600'
    if (acc >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getWpmColor = (wpm: number) => {
    if (wpm >= 40) return 'text-green-600'
    if (wpm >= 25) return 'text-yellow-600'
    return 'text-galah-pink-vibrant'
  }

  return (
    <div className="card bg-galah-pink-vibrant text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-3xl font-bold mb-1`}>
            {wpm}
          </div>
          <div className="text-sm opacity-90">
            Words per Minute
          </div>
        </div>

        <div className="text-center">
          <div className={`text-3xl font-bold mb-1`}>
            {accuracy}%
          </div>
          <div className="text-sm opacity-90">
            Accuracy
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold mb-1">
            {formatTime(timeElapsed)}
          </div>
          <div className="text-sm opacity-90">
            Time Elapsed
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold mb-1">
            {Math.round(progress)}%
          </div>
          <div className="text-sm opacity-90">
            Progress
          </div>
        </div>
      </div>

      <div className="w-full bg-white/20 rounded-full h-3">
        <div 
          className="bg-white h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  )
} 