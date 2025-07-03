import RescueGame from '@/components/RescueGame'

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-galah-off-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-galah-grey-dark mb-4">
            🎮 Typing Games
          </h1>
          <p className="text-xl text-galah-grey-mid max-w-2xl mx-auto">
            Put your typing skills to the test with these fair dinkum Australian games! 
            Practice your speed and accuracy while having a bloody good time.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Galah Rescue Game Card */}
          <div className="card">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🦜</div>
              <h2 className="text-2xl font-bold text-galah-grey-dark mb-2">
                Galah Rescue
              </h2>
              <p className="text-galah-grey-mid">
                Save falling galahs by typing Australian words before they hit the ground!
              </p>
            </div>
            
            <div className="space-y-3 text-sm text-galah-grey-mid">
              <div className="flex items-center justify-between">
                <span>Difficulty:</span>
                <span className="font-semibold text-orange-600">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Focus:</span>
                <span className="font-semibold">Speed & Accuracy</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vocabulary:</span>
                <span className="font-semibold">Australian Slang</span>
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="card opacity-60">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-galah-grey-dark mb-2">
                Outback Speed Race
              </h2>
              <p className="text-galah-grey-mid">
                Race through the outback by typing sentences as fast as you can!
              </p>
            </div>
            
            <div className="text-center">
              <span className="inline-block bg-galah-grey-light text-white px-4 py-2 rounded-lg font-semibold">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RescueGame />
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-galah-grey-dark mb-2">Stay Focused</h3>
            <p className="text-sm text-galah-grey-mid">
              Keep your eyes on the screen and don't look at the keyboard
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-galah-grey-dark mb-2">Build Speed</h3>
            <p className="text-sm text-galah-grey-mid">
              Start slow and gradually increase your typing speed
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-bold text-galah-grey-dark mb-2">Practice Daily</h3>
            <p className="text-sm text-galah-grey-mid">
              Regular practice is the key to improving your skills
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 