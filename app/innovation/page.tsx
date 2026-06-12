import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Rocket, Cpu, Code, Lightbulb, GraduationCap, ArrowRight, ShieldCheck, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Innovation & STEM — Light International School',
  description: 'Explore STEM projects, Robotics, Coding initiatives, and Entrepreneurship at LIS.',
}

const pathways = [
  {
    title: 'Robotics & AI Lab',
    desc: 'From building line-followers to programming autonomous humanoid robots with vision tracking. Students explore machine learning, sensors, and mechanical engineering.',
    icon: Cpu,
    color: 'border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Coding & App Development',
    desc: 'Software development starting from blocks (Scratch) in primary school to advanced Python, Java, and web stacks (Next.js/React) for secondary and A Level software projects.',
    icon: Code,
    color: 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-500'
  },
  {
    title: 'Student Entrepreneurship',
    desc: 'Incubating solutions for local challenges. Students build real business plans, present to industry judges, and launch social enterprises through our innovation hubs.',
    icon: Lightbulb,
    color: 'border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 text-amber-500'
  }
]

const projects = [
  {
    title: 'Autonomous Agricultural Drone',
    category: 'STEM Challenge Winner 2025',
    desc: 'An AI-guided micro-drone built by Year 12 students that monitors soil moisture and uses computer vision to detect plant diseases in local Kenyan farms.',
    award: 'National Sci-Tech Fair: 1st Place',
    tech: ['Python', 'Raspberry Pi', 'OpenCV', '3D Printing']
  },
  {
    title: 'Renewable Smart-Grid System',
    category: 'Robotics & Green Energy Initiative',
    desc: 'A simulated town power grid that dynamically allocates energy from solar and wind arrays based on machine learning predictions of hourly consumption.',
    award: 'African STEM Summit: Outstanding Innovation',
    tech: ['Arduino', 'C++', 'Solar Sensors', 'IoT Cloud']
  },
  {
    title: 'LIS Student Portal Mobile App',
    category: 'Coding & Software Engineering',
    desc: 'A cross-platform mobile application fully designed, coded, and maintained by student council members to handle cafeteria ordering, clubs registration, and feedback.',
    award: 'School Tech Award',
    tech: ['React Native', 'Node.js', 'Tailwind', 'Supabase']
  }
]

export default function InnovationPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHero
        image="/science-class.jpeg"
        badge="Future-Ready Education"
        title="Innovation &"
        titleAccent="STEM Showcase"
        subtitle="Nurturing the next generation of engineers, software architects, and tech innovators through hands-on coding, advanced robotics, and real-world incubation."
        overlayOpacity={60}
        cmsPage="innovation"
        cta={{ label: 'Admissions Inquiry', href: '/admissions' }}
        ctaSecondary={{ label: 'Explore Campus Tour', href: '/campus-tour' }}
        lanyardName="STEM & Tech"
      />

      {/* Philosophy */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">The Innovator Mindset</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Empowering minds to design, test, and build the future</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Light International School is committed to providing a future-proof education. We integrate technology and scientific exploration directly into our curriculum to foster problem-solving, collaboration, and high-order critical thinking.
          </p>
        </div>

        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.1 } } }, item: { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } } }}
          className="grid gap-8 md:grid-cols-3"
        >
          {pathways.map(({ title, desc, icon: Icon, color }) => (
            <div key={title} className={`rounded-2xl border p-6 flex flex-col gap-4 ${color}`}>
              <div className="size-12 rounded-xl bg-card border flex items-center justify-center shadow-sm">
                <Icon className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* Featured Projects Grid */}
      <section className="bg-card/30 border-y border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Excellence in Action</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance">Student Project Showcase</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Explore some of the award-winning systems designed and developed in our makerspaces this year.</p>
          </div>

          <AnimatedGroup
            triggerOnView
            variants={{ container: { visible: { transition: { staggerChildren: 0.1 } } }, item: { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } } }}
            className="grid gap-6 md:grid-cols-3"
          >
            {projects.map(({ title, category, desc, award, tech }) => (
              <div key={title} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-lg transition-all">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="size-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">{category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{desc}</p>
                  
                  <div className="bg-blue-600/5 dark:bg-blue-600/10 rounded-lg p-3 border border-blue-600/10 mb-4">
                    <span className="text-xs font-bold text-blue-600 block mb-1">Achievement:</span>
                    <p className="text-xs text-foreground font-semibold">{award}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tech.map((t) => (
                      <span key={t} className="rounded-full bg-accent text-accent-foreground px-2.5 py-0.5 text-xs font-medium border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* Tech and Innovation Infrastructure */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden border border-border">
            <img src="/science-class.jpeg" alt="Smart Innovation Lab" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-mono uppercase bg-blue-600 px-2.5 py-1 rounded-md">New Campus Upgrade</span>
              <h4 className="text-lg font-bold mt-2">Nairobi Karen Makerspace</h4>
              <p className="text-xs text-white/80 mt-1">Equipped with 3D printers, laser cutters, oscilloscope benches, and drone test cages.</p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">World-Class Facilities</span>
            <h2 className="text-3xl font-bold">Incubating Ideas into Innovations</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our school features state-of-the-art laboratory environments across all campuses, bringing theoretical math, physics, and computer science concepts into rapid hardware testing.
            </p>
            <div className="space-y-3">
              {[
                '3D Design & CAD workstations supporting rapid prototyping.',
                'Dedicated IoT hardware kits for testing home automation and energy systems.',
                'Advanced virtual programming benches supporting AI training datasets.',
                'Annual Sci-Tech Exhibitions connecting students directly to technology sector leaders.'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ShieldCheck className="size-4 text-emerald-500 shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
