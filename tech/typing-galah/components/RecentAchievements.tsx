export default function RecentAchievements({ userId }: { userId: string }) {
  const achievements = [
    {
      name: "First Galah Feather",
      description: "Completed your first lesson",
      icon: "🪶",
      date: "2 days ago"
    },
    {
      name: "Fair Dinkum Beginner",
      description: "Reached 20 WPM",
      icon: "🎯",
      date: "1 week ago"
    },
    {
      name: "You Little Ripper!",
      description: "Perfect accuracy on a lesson",
      icon: "🏆",
      date: "1 week ago"
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-galah-grey-dark mb-4">
        Recent Achievements
      </h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-galah-pink-soft/5 rounded-lg">
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-galah-grey-dark text-sm">
                {achievement.name}
              </h4>
              <p className="text-xs text-galah-grey-mid">
                {achievement.description}
              </p>
              <p className="text-xs text-galah-pink-vibrant mt-1">
                {achievement.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-galah-pink-vibrant hover:text-galah-pink-soft font-medium">
          View All Achievements
        </button>
      </div>
    </div>
  )
} 