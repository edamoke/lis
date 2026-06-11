import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { Award, Globe, Heart, Target } from 'lucide-react'

export const metadata = {
  title: 'About Us — Light International School',
  description: 'Learn about Light International School, our mission, values, and commitment to excellence in Cambridge International education across Kenya.',
}

const values = [
  { icon: Target, title: 'Our Mission', body: 'To provide a world-class Cambridge International education that nurtures confident, compassionate, and innovative learners prepared for the global stage.' },
  { icon: Heart, title: 'Our Values', body: 'We are guided by integrity, respect, excellence, and a deep commitment to the holistic development of every student in our community.' },
  { icon: Globe, title: 'Global Outlook', body: 'With students from over 15 nationalities, we celebrate diversity and equip every learner with the international mindset needed to thrive anywhere in the world.' },
  { icon: Award, title: 'Excellence', body: 'Our students consistently achieve outstanding Cambridge International results, gaining entry to top universities across Africa, Europe, and beyond.' },
]

const milestones = [
  { year: '2004', event: 'Light International School founded in Nairobi with a vision to deliver world-class education in Kenya.' },
  { year: '2008', event: 'Expansion to Mombasa, bringing Cambridge education to the Kenyan coast.' },
  { year: '2012', event: 'Launch of A Level programme, completing the full Cambridge pathway from KG to university entry.' },
  { year: '2015', event: 'Opening of Malindi campus, reaching Kenya\'s third major city.' },
  { year: '2018', event: 'LIS Nairobi Lavington campus opened to serve Nairobi\'s growing international community.' },
  { year: '2020', event: 'Dedicated Kindergarten campus established along Lenana Road, Nairobi.' },
  { year: '2024', event: 'Celebrating 20 years of excellence with over 2,000 students across five campuses.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/about.png"
        badge="Our Story"
        title="About Light International"
        titleAccent="School"
        subtitle="Two decades of nurturing future leaders through Cambridge excellence across Kenya."
        overlayOpacity={55}
        cmsPage="about"
        cta={{ label: 'Contact Us', href: '/contact' }}
        ctaSecondary={{ label: 'Our Campuses', href: '/schools' }}
        lanyardName="About LIS"
      />

      {/* Mission & Values */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, ...transitionVariants }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="size-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <Icon className="size-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* About body */}
      <section className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedGroup triggerOnView variants={{ container: { visible: { transition: { staggerChildren: 0.08 } } }, ...transitionVariants }}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Who We Are</span>
              <h2 className="mt-3 text-3xl font-semibold text-balance">A Premier Cambridge Institution in Kenya</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Light International School is one of Kenya&apos;s leading Cambridge International institutions, with five campuses spread across Nairobi, Mombasa, and Malindi. Since our founding, we have been dedicated to delivering an education that goes beyond the classroom — building character, confidence, and a lifelong love of learning.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our Cambridge International curriculum, delivered by a team of experienced and passionate educators, prepares students for success at the world&apos;s top universities and in every career they choose. We are proud of the diverse, inclusive community we have built — one that mirrors the globalised world our graduates will lead.
              </p>
            </div>
          </AnimatedGroup>
          {/* Timeline */}
          <AnimatedGroup triggerOnView variants={{ container: { visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }, ...transitionVariants }}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Our Journey</h3>
              <ol className="relative border-l border-blue-600/30 space-y-6 pl-6">
                {milestones.map(({ year, event }) => (
                  <li key={year} className="relative">
                    <span className="absolute -left-[25px] top-1 size-3 rounded-full bg-blue-600 ring-2 ring-background" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{year}</span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{event}</p>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Leadership note */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24 text-center">
        <AnimatedGroup triggerOnView variants={{ container: { visible: { transition: { staggerChildren: 0.08 } } }, ...transitionVariants }}>
          <blockquote>
            <p className="text-2xl font-medium text-balance leading-snug">
              &ldquo;Our goal is simple: to unlock the potential of every child and send them into the world as confident, capable, and compassionate human beings.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">School Leadership, Light International School</footer>
          </blockquote>
        </AnimatedGroup>
      </section>
    </main>
  )
}
