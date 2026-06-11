import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { Briefcase, Heart, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Careers — Light International School',
  description: 'Join the Light International School team. Explore teaching and administrative career opportunities across our campuses in Kenya.',
}

const perks = [
  { icon: Star, title: 'Professional Growth', body: 'Ongoing CPD, Cambridge teacher training, and clear career progression pathways for all staff.' },
  { icon: Heart, title: 'Supportive Community', body: 'A warm, collaborative culture where staff are valued, supported, and celebrated.' },
  { icon: TrendingUp, title: 'Competitive Package', body: 'Competitive salaries, medical cover, and staff benefits across all our campuses.' },
  { icon: Briefcase, title: 'Diverse Roles', body: 'Opportunities in teaching, administration, ICT, student support, and leadership.' },
]

const openings = [
  { title: 'Cambridge Science Teacher (IGCSE & A Level)', campus: 'Nairobi Karen', type: 'Full-time' },
  { title: 'Early Childhood Educator', campus: 'Nairobi Kindergarten', type: 'Full-time' },
  { title: 'ICT Teacher (Secondary)', campus: 'Mombasa', type: 'Full-time' },
  { title: 'English & Literature Teacher (Lower Secondary)', campus: 'Nairobi Lavington', type: 'Full-time' },
  { title: 'School Counsellor', campus: 'All Campuses', type: 'Full-time' },
  { title: 'Admissions & Marketing Officer', campus: 'Malindi', type: 'Full-time' },
  { title: 'ICT Support Technician', campus: 'Nairobi Karen', type: 'Full-time' },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/careers.png"
        badge="Join Our Team"
        title="Shape the Future"
        titleAccent="of Education"
        subtitle="We are looking for passionate, talented people who want to make a difference at LIS."
        overlayOpacity={60}
        cmsPage="careers"
        cta={{ label: 'View Openings', href: '#openings' }}
        ctaSecondary={{ label: 'Send Your CV', href: 'mailto:info@lis.sc.ke?subject=Spontaneous Application' }}
        lanyardName="Careers at LIS"
      />

      {/* Why work at LIS */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Why LIS</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Why Work With Us?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Joining Light International School means joining a community of educators who are passionate about changing lives through education.</p>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, ...transitionVariants }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="size-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <Icon className="size-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* Current openings */}
      <section className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Opportunities</span>
            <h2 className="mt-3 text-3xl font-semibold">Current Openings</h2>
          </div>
          <AnimatedGroup
            triggerOnView
            variants={{ container: { visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }, ...transitionVariants }}
            className="space-y-4"
          >
            {openings.map(({ title, campus, type }) => (
              <div key={title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{campus} &middot; {type}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href="mailto:info@lis.sc.ke?subject=Job Application">Apply</a>
                </Button>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* Spontaneous applications */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24 text-center">
        <h2 className="text-2xl font-semibold text-balance">Don&apos;t See Your Role?</h2>
        <p className="mt-4 text-muted-foreground">We welcome spontaneous applications from exceptional educators and professionals. Send your CV and a cover letter and we will keep you in mind for future opportunities.</p>
        <div className="mt-8">
          <Button asChild size="lg">
            <a href="mailto:info@lis.sc.ke?subject=Spontaneous Application">Send Your CV</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
