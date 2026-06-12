'use client'

import React, { useState } from 'react'
import PageHero from '@/components/page-hero'
import { MapPin, ArrowRight, Video, Compass, Layers, Milestone, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const locations = [
  {
    id: 'karen-science',
    campus: 'Nairobi Karen',
    name: 'State-of-the-Art Science Lab',
    type: 'Academic',
    desc: 'Fully equipped for chemistry, biology, and physics experiments with modern digital spectrometers and safe venting desks.',
    image: '/science-class.jpeg',
    hotspots: [
      { x: 30, y: 40, label: 'Advanced Fume Hoods', info: 'Specially ventilated spaces for chemical reactions.' },
      { x: 70, y: 60, label: 'Digital Spectrometers', info: 'Supporting undergraduate-level analytical biochemistry.' }
    ]
  },
  {
    id: 'karen-art',
    campus: 'Nairobi Karen',
    name: 'Creative & Fine Arts Studio',
    type: 'Arts',
    desc: 'A sun-drenched sanctuary supporting painting, pottery, and digital design. Host of our annual LIS Art Exhibition.',
    image: '/art-class.jpeg',
    hotspots: [
      { x: 20, y: 30, label: 'Digital Design Bay', info: 'Wacom tablets and iMac stations for graphic styling.' },
      { x: 80, y: 55, label: 'Sculpture & Pottery Kilns', info: 'Industrial heating for standard ceramic models.' }
    ]
  },
  {
    id: 'mombasa-pool',
    campus: 'Mombasa Campus',
    name: 'Olympic-Sized Swimming Complex',
    type: 'Sports',
    desc: 'Our flagship 25-meter professional aquatic training arena, fitted with automated timing gates and viewing galleries.',
    image: '/school-programs.jpeg',
    hotspots: [
      { x: 45, y: 50, label: 'Electronic Race Timer', info: 'Accurate to the millisecond for professional swim training.' }
    ]
  }
]

export default function CampusTourPage() {
  const [activeTab, setActiveTab] = useState('karen-science')
  const [selectedHotspot, setSelectedHotspot] = useState<{ label: string; info: string } | null>(null)

  const activeLoc = locations.find((l) => l.id === activeTab) || locations[0]

  return (
    <main className="min-h-screen bg-background pb-16">
      <PageHero
        image="/school-programs.jpeg"
        badge="Remote Campus Exploration"
        title="Virtual Campus"
        titleAccent="Experience"
        subtitle="Step inside our world-class campuses across Kenya. Explore state-of-the-art facilities, classrooms, and sports arenas from the comfort of your home."
        overlayOpacity={60}
        cmsPage="campus-tour"
        cta={{ label: 'Admissions Inquiry', href: '/admissions' }}
        ctaSecondary={{ label: 'Explore Academic Programs', href: '/academics' }}
        lanyardName="Campus Tour"
      />

      {/* Interactive 360-degree Simulation */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">360° Interactive Explorer</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Explore Our Campus Classrooms & Facilities</h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Select a location below to load the immersive visual playground. Click on the glowing interactive hot-spots to inspect our teaching gear and learning technologies.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-border pb-6">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                setActiveTab(loc.id)
                setSelectedHotspot(null)
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border flex items-center gap-2 ${
                activeTab === loc.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              <Compass className="size-3.5" />
              <span>{loc.name}</span>
              <span className="text-[10px] opacity-75 uppercase">({loc.campus})</span>
            </button>
          ))}
        </div>

        {/* 360° Interactive Canvas */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-zinc-950 group">
          {/* Main Panorama Image */}
          <img
            src={activeLoc.image}
            alt={activeLoc.name}
            className="w-full h-full object-cover transition-all duration-700 blur-xs group-hover:blur-none scale-102"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

          {/* Compass & Panorama HUD indicators */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md rounded-lg px-3 py-1.5 border border-border text-xs font-semibold flex items-center gap-2">
            <Video className="size-3.5 text-red-500 animate-pulse" />
            <span>Interactive 360° Panorama Mockup</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-xl p-4 border border-border max-w-sm">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{activeLoc.campus} — {activeLoc.type}</span>
            <h3 className="font-bold text-sm mt-1">{activeLoc.name}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{activeLoc.desc}</p>
          </div>

          {/* Dynamic Hotspots */}
          {activeLoc.hotspots.map((hs, index) => (
            <button
              key={index}
              onClick={() => setSelectedHotspot(hs)}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
              title={hs.label}
            >
              <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-600 animate-ping opacity-75" />
              <span className="relative size-5 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-lg text-xs font-bold hover:scale-115 transition-transform cursor-pointer">
                +
              </span>
            </button>
          ))}

          {/* Hotspot Info Display Overlay */}
          {selectedHotspot && (
            <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-lg rounded-xl p-4 border border-border max-w-xs shadow-2xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Info className="size-4 text-blue-600 shrink-0" />
                  <h4 className="font-bold text-sm text-foreground">{selectedHotspot.label}</h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-xs font-bold hover:text-red-500 leading-none"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedHotspot.info}</p>
            </div>
          )}
        </div>
      </section>

      {/* Facilities Overview Cards */}
      <section className="bg-card/30 border-y border-border py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">The LIS Infrastructure</span>
            <h2 className="mt-2 text-2xl font-bold">Modern Campus Facilities at a Glance</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
              <Layers className="size-5 text-blue-600" />
              <h4 className="font-bold text-sm">Interactive Classrooms</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Integrated Google Classroom, dual-projector setups, and flexible dynamic desks supporting quick teamwork.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
              <Milestone className="size-5 text-blue-600" />
              <h4 className="font-bold text-sm">Advanced Tech Labs</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Equipped with standard high-performance computers, IoT micro-controller kits, and professional CAD modeling softwares.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
              <MapPin className="size-5 text-blue-600" />
              <h4 className="font-bold text-sm">Strategic Locations</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Five secure, fully monitored beautiful campuses located in serene suburbs across Nairobi, Mombasa, and Malindi.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
              <Compass className="size-5 text-blue-600" />
              <h4 className="font-bold text-sm">Creative Makerspaces</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">A-level innovation hubs loaded with 3D-printers, mechanical toolboxes, woodcraft, and design bays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Open Day Booking */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Virtual Open Day</span>
        <h2 className="mt-3 text-3xl font-semibold text-balance">Schedule a Live Guided Virtual Walkthrough</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Can’t visit us in person? Join our next live-streamed Virtual Open Day where admissions heads tour you and answer questions in real-time.</p>
        <div className="mt-8">
          <Button asChild size="lg">
            <a href="/admissions">Book a Tour Spot</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
