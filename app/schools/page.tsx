import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { schools } from '@/lib/schools-data'
import { GraduationCap, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Our Schools — Light International School',
  description: 'Explore all five Light International School campuses across Nairobi, Mombasa, and Malindi. Find the campus nearest you.',
}

const imageMap: Record<string, string> = {
  'nairobi-karen': '/schools/nairobi-karen.png',
  'nairobi-lavington': '/schools/nairobi-lavington.png',
  'nairobi-kindergarten': '/schools/nairobi-kindergarten.png',
  'mombasa': '/schools/mombasa.png',
  'malindi': '/schools/malindi.png',
}

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/schools.png"
        badge="Five Campuses"
        title="Our"
        titleAccent="Schools"
        subtitle="From Nairobi to the Kenyan coast — world-class Cambridge education closer to you."
        overlayOpacity={55}
        cmsPage="schools"
        cta={{ label: 'Apply Now', href: '/admissions' }}
        ctaSecondary={{ label: 'Contact Us', href: '/contact' }}
        lanyardName="LIS Schools"
      />

      {/* Campus cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">All Campuses</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Find Your Campus</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Each of our five campuses shares the same commitment to Cambridge excellence and holistic development, in their own unique setting.</p>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }, ...transitionVariants }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {schools.map((school) => (
            <Link
              key={school.slug}
              href={`/schools/${school.slug}`}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={imageMap[school.slug] ?? '/schools/nairobi-karen.png'}
                  alt={school.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-blue-600/90 px-2.5 py-0.5 text-xs font-medium text-white">{school.city}</span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-semibold text-base group-hover:text-blue-600 transition-colors">{school.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{school.tagline}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-blue-600 shrink-0" />
                    {school.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-3.5 text-blue-600 shrink-0" />
                    {school.grades}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-blue-600 shrink-0" />
                    {school.phone}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </AnimatedGroup>
      </section>
    </main>
  )
}
