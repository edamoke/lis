import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { BookOpen, FlaskConical, Globe, GraduationCap, Laptop, Users } from 'lucide-react'

export const metadata = {
  title: 'Academics — Light International School',
  description: 'Explore the Cambridge International curriculum, programmes, and academic excellence at Light International School across Kenya.',
}

const stages = [
  {
    stage: 'Early Years',
    ages: 'Ages 3–5',
    description: 'Play-based discovery that builds language, numeracy, and social foundations through the Cambridge Early Years framework.',
    colour: 'bg-green-600/10 text-green-700 dark:text-green-400',
  },
  {
    stage: 'Cambridge Primary',
    ages: 'Ages 5–11 (Reception – Year 6)',
    description: 'A broad, balanced curriculum covering English, Mathematics, Science, ICT, and the Arts — building confident, curious learners.',
    colour: 'bg-blue-600/10 text-blue-700 dark:text-blue-400',
  },
  {
    stage: 'Cambridge Lower Secondary',
    ages: 'Ages 11–14 (Year 7 – Year 9)',
    description: 'Deepening knowledge across core subjects with a global perspective, culminating in the Cambridge Checkpoint assessment.',
    colour: 'bg-indigo-600/10 text-indigo-700 dark:text-indigo-400',
  },
  {
    stage: 'Cambridge IGCSE',
    ages: 'Ages 14–16 (Year 10 – Year 11)',
    description: 'Internationally recognised qualifications across a wide range of subjects, preparing students for advanced study.',
    colour: 'bg-purple-600/10 text-purple-700 dark:text-purple-400',
  },
  {
    stage: 'Cambridge AS & A Levels',
    ages: 'Ages 16–18 (Year 12 – Year 13)',
    description: 'The gold standard for university entry, with a Corporate Internship Programme at Karen campus for real-world exposure.',
    colour: 'bg-red-600/10 text-red-700 dark:text-red-400',
  },
]

const highlights = [
  { icon: GraduationCap, title: 'Cambridge Certified', body: 'Fully accredited Cambridge International School delivering internationally recognised qualifications.' },
  { icon: FlaskConical, title: 'Science & STEM Labs', body: 'State-of-the-art science and ICT laboratories that bring learning to life through hands-on experimentation.' },
  { icon: Laptop, title: 'Technology-Enhanced', body: 'Google Suite for Education and technology-integrated classrooms across all campuses.' },
  { icon: Globe, title: 'Global Competitions', body: 'Active participation in World Scholars Cup, MUN, Science Olympiads, and IFLC.' },
  { icon: Users, title: 'Expert Educators', body: 'Highly qualified, experienced teachers committed to individualised student success.' },
  { icon: BookOpen, title: 'Rich Library Resources', body: 'Comprehensive library and digital resource centres supporting independent research and reading.' },
]

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/academics.png"
        badge="Cambridge Curriculum"
        title="Academic"
        titleAccent="Excellence"
        subtitle="A complete Cambridge International journey from Early Years to A Levels across five campuses."
        overlayOpacity={60}
        cmsPage="academics"
        cta={{ label: 'Apply Now', href: '/admissions' }}
        ctaSecondary={{ label: 'Our Campuses', href: '/schools' }}
        lanyardName="Academics"
      />

      {/* Academic pathway */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Programmes</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">The Cambridge Pathway</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Each stage of our Cambridge pathway is designed to build on the last, creating a seamless, enriching educational journey from Reception through to university entry.</p>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, ...transitionVariants }}
          className="space-y-4"
        >
          {stages.map(({ stage, ages, description, colour }) => (
            <div key={stage} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-card p-6">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${colour}`}>{stage}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{ages}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* Academic highlights grid */}
      <section className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Why LIS</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance">Academic Highlights</h2>
          </div>
          <AnimatedGroup
            triggerOnView
            variants={{ container: { visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }, ...transitionVariants }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <div className="size-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                  <Icon className="size-5 text-blue-600" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Beyond the Classroom</span>
        <h2 className="mt-3 text-3xl font-semibold text-balance">Co-Curricular Excellence</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Learning at LIS extends beyond textbooks. Our students develop leadership, creativity, and teamwork through clubs, competitions, sports, and community service initiatives.</p>
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }, ...transitionVariants }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {['Robotics Club', 'Model United Nations', 'World Scholars Cup', 'IFLC', 'Science Olympiads', 'Digital Arts', 'Swimming', 'Soccer & Rugby', 'Basketball', 'Karate', 'Community Service', 'Student Council', 'Debate & Public Speaking', 'Environmental Activities'].map((act) => (
            <span key={act} className="rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-400 px-4 py-1.5 text-sm font-medium">{act}</span>
          ))}
        </AnimatedGroup>
      </section>
    </main>
  )
}
