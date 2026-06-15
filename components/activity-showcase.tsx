'use client'

import { useEffect, useRef, useState } from 'react'

const activities = [
  {
    image: '/activities/outdoor.png',
    label: 'Outdoors',
    title: 'Chase the golden hour',
    description: 'Trails, viewpoints and spontaneous adventures tailored to your energy and the weather outside.',
  },
  {
    image: '/activities/dining.png',
    label: 'Food & Drink',
    title: 'Find your next table',
    description: 'From hidden neighborhood spots to buzzing dinners, discover places worth gathering around.',
  },
  {
    image: '/activities/nightlife.png',
    label: 'Live',
    title: 'Feel the moment',
    description: 'Concerts, shows and events happening near you — matched to the music and vibe you love.',
  },
  {
    image: '/activities/culture.png',
    label: 'Culture',
    title: 'Slow down and explore',
    description: 'Galleries, exhibitions and quiet corners of the city for the days you want to wander.',
  },
]

export function ActivityShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return

      // progress through the pinned section [0, 1]
      const progress = Math.min(Math.max(-rect.top / total, 0), 1)
      const index = Math.min(
        activities.length - 1,
        Math.floor(progress * activities.length)
      )
      setActive(index)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Activity categories"
      className="relative"
      style={{ height: `${activities.length * 100}vh` }}
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Stacked diagonal image blocks */}
        {activities.map((activity, i) => (
          <div
            key={activity.image}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              clipPath: 'polygon(0 0, 100% 0, 100% 86%, 0 100%)',
            }}
          >
            <img
              src={activity.image || "/placeholder.svg"}
              alt={activity.title}
              className="h-full w-full object-cover scale-105 transition-transform duration-[1200ms] ease-out"
              style={{ transform: i === active ? 'scale(1.05)' : 'scale(1.12)' }}
            />
            {/* darkening layer for global contrast */}
            <div className="absolute inset-0 bg-foreground/30" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              {/* Blurred panel: image behind text gets blurred via backdrop-blur */}
              <div className="rounded-2xl border border-background/15 bg-foreground/20 p-8 backdrop-blur-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {activities[active].label}
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-background text-balance sm:text-4xl">
                  {activities[active].title}
                </h2>
                <p className="mt-4 leading-relaxed text-background/80">
                  {activities[active].description}
                </p>

                {/* Progress dots */}
                <div className="mt-8 flex items-center gap-2">
                  {activities.map((a, i) => (
                    <span
                      key={a.label}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === active ? 'w-8 bg-background' : 'w-3 bg-background/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
