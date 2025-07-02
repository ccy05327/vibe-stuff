export default function ProjectStorySection() {
  return (
    <section className="py-20 bg-galah-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-galah-grey-dark mb-4">
            Why <span className="galah-gradient-text">Typing Galah</span> Exists
          </h2>
          <p className="text-xl text-galah-grey-mid max-w-3xl mx-auto">
            A little story about Australian English and typing frustration
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Personal Story */}
          <div className="card mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-galah-grey-dark mb-2">The Problem</h3>
            </div>
            <div className="text-galah-grey-mid leading-relaxed space-y-4">
              <p>
                Ever tried learning to type on those big American websites? You're there trying to improve your typing 
                speed, but you keep having to type words like "color", "theater", and "aluminum" - words that just 
                feel wrong to Australian fingers!
              </p>
              <p>
                Even the British sites aren't quite right. We don't say "lift" - we say "elevator" sometimes too. 
                We don't just say "biscuit" - we say "bikkie"! Where's the "arvo", "servo", and "barbie"?
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="card mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-galah-grey-dark mb-2">The Solution</h3>
            </div>
            <div className="text-galah-grey-mid leading-relaxed space-y-4">
              <p>
                So I thought, "Why not make a typing site that actually speaks our language?" 
                Not as a commercial venture, not to compete with the big players, but just as a fun project 
                for fellow Aussies who want to practice typing with words that actually come out of our mouths.
              </p>
              <p>
                This is Typing Galah - a little passion project celebrating Australian English, one keystroke at a time. 
                It's free, it's made with love, and it's fair dinkum Australian.
              </p>
            </div>
          </div>

          {/* What Makes it Special */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🇦🇺</div>
                <h4 className="font-semibold text-galah-grey-dark">Real Aussie Content</h4>
              </div>
              <p className="text-galah-grey-mid text-sm">
                Not just British English with a few "mate"s thrown in. Real Australian phrases, 
                slang, and spelling that you'd actually use in everyday conversation.
              </p>
            </div>

            <div className="card">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">❤️</div>
                <h4 className="font-semibold text-galah-grey-dark">Made for Fun</h4>
              </div>
              <p className="text-galah-grey-mid text-sm">
                No corporate agenda, no premium upsells, no data harvesting. 
                Just a simple tool made by an Aussie, for Aussies, because it needed to exist.
              </p>
            </div>
          </div>

          {/* Call to try it */}
          <div className="text-center mt-12">
            <div className="card bg-galah-pink-soft/10 inline-block">
              <p className="text-galah-grey-dark text-lg mb-2">
                <span className="text-2xl">🦜</span> Give it a go and see how it feels to type in your own language!
              </p>
              <p className="text-galah-grey-mid text-sm">
                It's just a bit of fun, but hey - if it helps you get better at typing, that's bonzer!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 