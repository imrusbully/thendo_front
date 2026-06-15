'use client'

import { useEffect, useRef, useState } from 'react'

const activities = [
  {
    image: '/activities/outdoor.png',
    label: 'Outdoor',
    title: 'Trails that move you',
    description: 'Sunrise hikes and hidden viewpoints, matched to your energy and the weather.',
  },
  {
    image: '/activities/dining.png',
    label: 'Food & Social',
    title: 'Tables worth gathering around',
    description: 'Places to eat and meet, picked for your taste and your crew.',
  },
  {
    image: '/activities/nightlife.png',
    label: 'Live & Music',
    title: 'Nights you will remember',
    description: 'Concerts, shows and events near you, tuned to your vibe.',
  },
  {
    image: '/activities/culture.png',
    label: 'Adventure',
    title: 'Go where the water leads',
    description: 'Active escapes and weekend trips, suggested from how you explore.',
  },
]

export function ActivityShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999)
      setActive(Math.floor(progress * activities.length))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '180vh' }} aria-label="Activity categories">
      <div className="sticky top-0 h-[80vh] overflow-hidden">
        {/* Images */}
        {activities.map((activity, i) => (
          <div
            key={activity.label}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: active === i ? 1 : 0 }}
            aria-hidden={active !== i}
          >
            <img
              src={activity.image || "/placeholder.svg"}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/5" />
          </div>
        ))}

        {/* Text overlay */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 sm:pb-16">
          <div className="max-w-md rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {activities[active].label}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground text-balance sm:text-3xl">
              {activities[active].title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {activities[active].description}
            </p>
            <div className="mt-5 flex gap-2">
              {activities.map((a, i) => (
                <span
                  key={a.label}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active === i ? 'w-8 bg-primary' : 'w-4 bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
