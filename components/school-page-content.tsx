'use client'

import React from 'react'
import { MapPin, Phone, Mail, GraduationCap, BookOpen, Users, Star } from 'lucide-react'
import { type School } from '@/lib/schools-data'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import PageHero from '@/components/page-hero'
import LanyardWithControls from '@/components/lanyard-with-controls'

const imageMap: Record<string, string> = {
  'nairobi-karen': '/schools/nairobi-karen.png',
  'nairobi-lavington': '/schools/nairobi-lavington.png',
  'nairobi-kindergarten': '/schools/nairobi-kindergarten.png',
  'mombasa': '/schools/mombasa.png',
  'malindi': '/schools/malindi.png',
}

interface SchoolPageContentProps {
  school: School
}

export default function SchoolPageContent({ school }: SchoolPageContentProps) {
  const heroImage = imageMap[school.slug] ?? '/schools/nairobi-karen.png'
  const [lanyardY, setLanyardY] = React.useState(0)

  React.useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Gentle parallax: lanyard moves up as user scrolls down
          setLanyardY(Math.min(window.scrollY * 0.02, 100))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background relative">
      {/* Full hero with lanyard — matches home hero style */}
      <PageHero
        image={heroImage}
        badge={school.city}
        title={school.name}
        titleAccent={school.tagline}
        subtitle={school.description.split('.')[0] + '.'}
        overlayOpacity={50}
        backHref="/schools"
        backLabel="All Schools"
        cmsPage={`schools/${school.slug}`}
        cta={{ label: `Call ${school.phone}`, href: `tel:${school.phone.replace(/\s/g, '')}` }}
        ctaSecondary={{ label: 'Email Us', href: `mailto:${school.email}` }}
        lanyardName={school.name}
      />

      {/* Info bar */}
      <section className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 opacity-80" />
            <span className="text-sm">{school.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 shrink-0 opacity-80" />
            <span className="text-sm">{school.grades}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 opacity-80" />
            <a href={`tel:${school.phone.replace(/\s/g, '')}`} className="text-sm hover:underline">{school.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 shrink-0 opacity-80" />
            <a href={`mailto:${school.email}`} className="text-sm hover:underline truncate">{school.email}</a>
          </div>
        </div>
      </section>

      {/* Fixed lanyard — scrolls through entire page on desktop */}
      <div
        className="fixed top-24 right-0 w-[40%] h-screen z-10 hidden lg:block pointer-events-none"
        style={{
          transform: `translateY(${lanyardY}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="w-full h-full pointer-events-auto">
          <LanyardWithControls
            position={[0, 0, 25]}
            containerClassName="w-full h-full select-none"
            defaultName={school.name}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24 lg:pr-[45%]">
        <div className="space-y-16">

            {/* About */}
            <AnimatedGroup
              triggerOnView
              variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4">About {school.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{school.description}</p>
              </div>
            </AnimatedGroup>

            {/* Why Choose Us */}
            <AnimatedGroup
              triggerOnView
              variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Star className="size-5 text-blue-600" />
                  Why Choose {school.name}?
                </h2>
                <ul className="space-y-3">
                  {school.whyChooseUs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 size-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedGroup>

            {/* Programmes */}
            <AnimatedGroup
              triggerOnView
              variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BookOpen className="size-5 text-blue-600" />
                  Programmes Offered
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {school.programs.map((prog) => (
                    <div key={prog} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium">
                      {prog}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedGroup>

            {/* Activities */}
            <AnimatedGroup
              triggerOnView
              variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="size-5 text-blue-600" />
                  Co-Curricular Activities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {school.activities.map((act) => (
                    <span key={act} className="rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-400 px-3 py-1 text-sm">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedGroup>

            {/* Facilities */}
            <AnimatedGroup
              triggerOnView
              variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6">Facilities</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {school.facilities.map((fac) => (
                    <div key={fac} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm">
                      <span className="size-2 rounded-full bg-blue-600 shrink-0" />
                      {fac}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedGroup>
        </div>
      </div>
    </main>
  )
}
