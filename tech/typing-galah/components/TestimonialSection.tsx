import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

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
          <Card className="mb-8">
            <CardHeader>
              <div className="text-center">
                <div className="text-6xl mb-4">🤔</div>
                <CardTitle className="text-2xl">The Problem</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* The Solution */}
          <Card className="mb-8">
            <CardHeader>
              <div className="text-center">
                <div className="text-6xl mb-4">💡</div>
                <CardTitle className="text-2xl">The Solution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* What Makes it Special */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl mb-2">🇦🇺</div>
                  <CardTitle className="text-base">Real Aussie Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-galah-grey-mid text-sm">
                  Not just British English with a few "mate"s thrown in. Real Australian phrases, 
                  slang, and spelling that you'd actually use in everyday conversation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl mb-2">❤️</div>
                  <CardTitle className="text-base">Made for Fun</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-galah-grey-mid text-sm">
                  No corporate agenda, no premium upsells, no data harvesting. 
                  Just a simple tool made by an Aussie, for Aussies, because it needed to exist.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to try it */}
          <div className="text-center mt-12">
            <Card className="bg-galah-pink-soft/10 inline-block">
              <CardContent>
                <p className="text-galah-grey-dark text-lg mb-2">
                  <span className="text-2xl">🦜</span> Give it a go and see how it feels to type in your own language!
                </p>
                <p className="text-galah-grey-mid text-sm">
                  It's just a bit of fun, but hey - if it helps you get better at typing, that's bonzer!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 