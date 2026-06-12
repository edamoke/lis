import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { Calendar, Users, Trophy, Heart, Palette, Sparkles, Tent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Student Life — Light International School',
  description: 'Discover school events, clubs, sports, and student leadership at Light International School.',
}

const clubs = [
  { name: 'Robotics & STEM Club', desc: 'Designing, building, and programming autonomous robots for national challenges.', icon: Sparkles },
  { name: 'Model United Nations', desc: 'Developing diplomacy, public speaking, and global awareness through conference simulations.', icon: Users },
  { name: 'World Scholars Cup', desc: 'Participating in international academic tournaments focused on debating and collaborative writing.', icon: Trophy },
  { name: 'Creative & Digital Arts', desc: 'Exploring traditional media, graphic design, and video editing for school projects.', icon: Palette },
  { name: 'Community Service Club', desc: 'Leading local charity projects, environmental cleanups, and tutoring initiatives.', icon: Heart },
  { name: 'Outdoor Adventure & Scouting', desc: 'Campouts, hiking, and survival skills workshops fostering self-reliance and teamwork.', icon: Tent },
]

const activities = [
  { category: 'Sports & Athletics', items: ['Swimming Club', 'Soccer Varsity Team', 'Rugby & Athletics', 'Basketball League', 'Indoor Table Tennis', 'Taekwondo & Karate'] },
  { category: 'Arts & Performance', items: ['School Choir', 'Drama & Theatre Society', 'Orchestra & Music Lessons', 'Photography Club', 'Digital Design & Art', 'Debate Society'] },
  { category: 'Leadership & Engagement', items: ['Student Council', 'Prefect Body', 'Editorial Board', 'Global Citizenship Hub', 'Peer Counselling', 'Environment Club'] },
]

export default function StudentLifeHub() {
  return (
    <main className="min-h-screen bg-background">
      <PageHero
        image="/heroes/careers.png"
        badge="Life at LIS"
        title="Student Life"
        titleAccent="Hub"
        subtitle="A vibrant, supportive community where students discover their passions, build lifelong friendships, and develop leadership skills beyond the classroom."
        overlayOpacity={50}
        cmsPage="student-life"
        cta={{ label: 'Admissions Inquiry', href: '/admissions' }}
        ctaSecondary={{ label: 'Explore Our Campuses', href: '/schools' }}
        lanyardName="Student Life"
      />

      {/* Intro section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">The Student Experience</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">Nurturing holistic development through engagement</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At Light International School, education is a vibrant journey that extends far beyond academics. We believe that physical health, social responsibility, and creative expression are fundamental components of a successful education.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our Student Life Hub coordinates dozens of activities, events, and societies, empowering each student to customize their school experience while cultivating confidence, teamwork, and critical leadership skills.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-blue-600">40+</span>
              <p className="font-semibold text-sm">Clubs & Societies</p>
              <p className="text-xs text-muted-foreground">From robotics to competitive debating, there is something for everyone.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-blue-600">12+</span>
              <p className="font-semibold text-sm">Sports Disciplines</p>
              <p className="text-xs text-muted-foreground">Expert coaches guiding competitive and recreational sports teams.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-blue-600">100%</span>
              <p className="font-semibold text-sm">Inclusivity</p>
              <p className="text-xs text-muted-foreground">Every student is encouraged to participate in co-curricular projects.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <span className="text-3xl font-extrabold text-blue-600">Annual</span>
              <p className="font-semibold text-sm">Excursions & Trips</p>
              <p className="text-xs text-muted-foreground">International and regional expeditions that expand global awareness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="bg-card/30 border-y border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Pursue Your Passions</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance">Featured Clubs & Societies</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Explore some of the student-led organizations making a positive difference across our campuses.</p>
          </div>

          <AnimatedGroup
            triggerOnView
            variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, item: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clubs.map(({ name, desc, icon: Icon }) => (
              <div key={name} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-all flex flex-col gap-4">
                <div className="size-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* Co-curricular activities categorized */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Extracurricular Directory</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Broad Co-Curricular Framework</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {activities.map(({ category, items }) => (
            <div key={category} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-blue-600">{category}</h3>
              <ul className="space-y-3 flex-1">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <span className="size-1.5 rounded-full bg-red-400 shrink-0" />
                    <span className="text-muted-foreground hover:text-foreground transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Events and Student Life CTA */}
      <section className="bg-blue-600 text-white text-center py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Trophy className="size-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl md:text-3xl font-bold">Discover Your Potential Beyond the Classroom</h2>
          <p className="mt-4 text-sky-100 max-w-lg mx-auto">Learn how we challenge students to lead and build confidence across sports, creativity, and public debate.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-sky-50">
              <Link href="/admissions">Join Our School</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
