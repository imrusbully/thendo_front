'use client'

const activities = [
  {
    image: '/activities/outdoor.png',
    label: 'Outdoors',
    title: 'Chase the golden hour',
  },
  {
    image: '/activities/dining.png',
    label: 'Food & Drink',
    title: 'Find your next table',
  },
  {
    image: '/activities/nightlife.png',
    label: 'Live',
    title: 'Feel the moment',
  },
  {
    image: '/activities/culture.png',
    label: 'Culture',
    title: 'Slow down and explore',
  },
]

export function ActivityShowcase() {
  return (
    <section aria-label="Activity categories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Something for every mood
          </h2>
          <p className="mt-4 text-muted-foreground">
            From quiet mornings to lively nights — explore the kinds of moments Thendo helps you find.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {activities.map((activity) => (
            <div
              key={activity.label}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border"
            >
              <img
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-xs font-medium text-background/80">
                  {activity.label}
                </span>
                <h3 className="mt-1 text-base font-medium text-background text-balance">
                  {activity.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
