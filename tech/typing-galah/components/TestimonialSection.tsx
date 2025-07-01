export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Year 8 Teacher, Brisbane',
      content: 'Finally! A typing platform that teaches our kids proper Australian spelling. My students love the slang lessons - they\'re actually excited about typing practice now.',
      avatar: '👩‍🏫'
    },
    {
      name: 'Jake Thompson',
      role: 'Student, Melbourne',
      content: 'This is heaps better than the American typing sites. I can type about stuff I actually say, like "arvo" and "servo". Got my first "You Little Ripper!" badge yesterday!',
      avatar: '🧑‍🎓'
    },
    {
      name: 'Linda Chen',
      role: 'Homeschool Parent, Perth',
      content: 'My daughter went from hunt-and-peck to 40 WPM in just 3 months. The Australian content makes such a difference - she\'s not confused by American spelling anymore.',
      avatar: '👩‍💼'
    }
  ]

  return (
    <section className="py-20 bg-galah-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-galah-grey-dark mb-4">
            What <span className="galah-gradient-text">Fair Dinkum</span> Users Say
          </h2>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto">
            From classrooms to lounge rooms, Aussies are loving their typing journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{testimonial.avatar}</div>
                <h4 className="font-semibold text-galah-grey-dark">{testimonial.name}</h4>
                <p className="text-sm text-galah-pink-vibrant font-medium">{testimonial.role}</p>
              </div>
              <blockquote className="text-galah-grey-mid leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="card bg-white">
              <div className="text-3xl font-bold text-galah-pink-vibrant mb-2">98%</div>
              <div className="text-galah-grey-mid">Improved Accuracy</div>
              <div className="text-sm text-galah-grey-mid mt-1">with Australian spelling</div>
            </div>
            <div className="card bg-white">
              <div className="text-3xl font-bold text-galah-pink-vibrant mb-2">3x</div>
              <div className="text-galah-grey-mid">Faster Learning</div>
              <div className="text-sm text-galah-grey-mid mt-1">compared to generic platforms</div>
            </div>
            <div className="card bg-white">
              <div className="text-3xl font-bold text-galah-pink-vibrant mb-2">500+</div>
              <div className="text-galah-grey-mid">Aussie Phrases</div>
              <div className="text-sm text-galah-grey-mid mt-1">and growing every week</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 