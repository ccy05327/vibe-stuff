export default function LessonProgress({ userId }: { userId: string }) {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-galah-grey-dark mb-4">
        Lesson Progress
      </h2>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-galah-grey-dark">Beginner Course</h3>
            <span className="text-sm text-galah-pink-vibrant font-medium">3/10 lessons</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-galah-pink-vibrant h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-sm text-galah-grey-mid">Master the home row keys with Aussie words</p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 opacity-60">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-galah-grey-dark">Slang Sesh</h3>
            <span className="text-sm text-galah-grey-mid">Locked</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-galah-grey-mid">Learn typing with fair dinkum Aussie slang</p>
        </div>
      </div>
    </div>
  )
} 