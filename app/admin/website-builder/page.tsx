'use client'

import React, { useState } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { Layout, Sliders, Type, Image as ImageIcon, Eye, Save, Sparkles, Check, Undo, Redo, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function VisualBuilderPage() {
  const [selectedElement, setSelectedElement] = useState<'hero' | 'about' | 'features'>('hero')
  const [isPublishing, setIsSubmitting] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)

  // Live builder states linked directly to the visual preview canvas!
  const [heroSettings, setHeroSettings] = useState({
    title: 'Access to Success',
    badge: 'Premier Cambridge Institution',
    accentText: 'Light International School',
    overlayOpacity: 55,
    alignment: 'left' as 'left' | 'center' | 'right',
    themeColor: 'blue' as 'blue' | 'purple' | 'red' | 'emerald',
    ctaLabel: 'Enrol Today',
  })

  const [aboutSettings, setAboutSettings] = useState({
    heading: 'Nurturing holistic development',
    body: 'We empower students to become confident, compassionate, and innovative global citizens prepared to succeed on a competitive stage.',
    yearsCount: '15+',
    studentSuccessRate: '98%',
  })

  const [featuresSettings, setFeaturesSettings] = useState({
    showCards: true,
    card1Title: 'Cambridge Curriculum',
    card2Title: 'STEM & Robotics Lab',
    card3Title: 'Arts & Sports Varsity',
  })

  const handlePublish = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setPublishSuccess(true)
      setTimeout(() => setPublishSuccess(false), 3000)
    }, 1200)
  }

  // Helper colors
  const colorMap = {
    blue: 'from-blue-600 to-sky-400',
    purple: 'from-purple-600 to-pink-400',
    red: 'from-red-600 to-amber-500',
    emerald: 'from-emerald-600 to-teal-400',
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden flex flex-col bg-muted/20">
          {/* Editor Sub-Header */}
          <header className="h-16 shrink-0 bg-card border-b border-border px-6 flex items-center justify-between z-10 shadow-sm">
            <div>
              <h1 className="text-sm font-bold flex items-center gap-2">
                <Layout className="size-4 text-blue-600" />
                Live Visual Website Builder
              </h1>
              <p className="text-[10px] text-muted-foreground">Drafting changes for Homepage • Dynamic Preview Sandbox</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium">
                <Undo className="size-3.5 mr-1" /> Undo
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium border">
                <Eye className="size-3.5 mr-1" /> Live Preview
              </Button>
              <Button
                onClick={handlePublish}
                size="sm"
                className="h-8 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="size-3 mr-1.5 animate-spin" /> Publishing...
                  </>
                ) : publishSuccess ? (
                  <>
                    <Check className="size-3 mr-1.5" /> Published Live!
                  </>
                ) : (
                  <>
                    <Save className="size-3.5 mr-1.5" /> Publish Live
                  </>
                )}
              </Button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Left side: Live Interactive Preview Canvas */}
            <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start">
              <div className="w-full max-w-3xl aspect-[16/10] bg-background rounded-2xl border shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300">
                {/* Simulated browser bar */}
                <div className="bg-muted px-4 py-2.5 border-b flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="size-2.5 rounded-full bg-red-400" />
                    <div className="size-2.5 rounded-full bg-amber-400" />
                    <div className="size-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-background rounded-md text-[10px] text-muted-foreground px-3 py-0.5 flex-1 max-w-sm font-mono truncate">
                    https://lis.ac.ke/homepage-preview
                  </div>
                </div>

                {/* Live Preview Screen */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  
                  {/* Visual Section 1: Hero */}
                  <div
                    onClick={() => setSelectedElement('hero')}
                    className={`relative p-10 py-16 border-2 transition-all cursor-pointer select-none group flex flex-col ${selectedElement === 'hero' ? 'border-blue-500 bg-blue-50/5 dark:bg-blue-950/10' : 'border-transparent hover:border-blue-500/30'}`}
                  >
                    <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      [Edit Hero Section]
                    </span>
                    
                    {/* Simulated Background and Overlay */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950/80 via-blue-950/40 to-red-950/30" />
                    <div
                      className="absolute inset-0 z-0 transition-opacity duration-300"
                      style={{ background: `rgba(0,0,0,${heroSettings.overlayOpacity / 100})` }}
                    />

                    {/* Hero Content */}
                    <div className={`relative z-10 w-full max-w-xl text-white ${heroSettings.alignment === 'center' ? 'text-center mx-auto' : heroSettings.alignment === 'right' ? 'text-right ml-auto' : 'text-left mr-auto'}`}>
                      <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-sm rounded-md px-2.5 py-1 uppercase tracking-wider">
                        {heroSettings.badge}
                      </span>
                      <h2 className="text-3xl font-extrabold mt-4 leading-tight">
                        {heroSettings.title}
                      </h2>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mt-1 leading-tight ${colorMap[heroSettings.themeColor]}`}>
                        {heroSettings.accentText}
                      </h3>
                      <button className={`mt-6 px-4 py-2 rounded-lg text-xs font-bold transition-all text-white bg-blue-600 hover:scale-105`}>
                        {heroSettings.ctaLabel}
                      </button>
                    </div>
                  </div>

                  {/* Visual Section 2: About */}
                  <div
                    onClick={() => setSelectedElement('about')}
                    className={`p-10 border-2 transition-all cursor-pointer group flex flex-col justify-center relative ${selectedElement === 'about' ? 'border-blue-500 bg-blue-50/5 dark:bg-blue-950/10' : 'border-transparent hover:border-blue-500/30'}`}
                  >
                    <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      [Edit About Section]
                    </span>

                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="md:col-span-7">
                        <span className="text-[10px] uppercase font-bold text-blue-600">Our Mission</span>
                        <h4 className="text-lg font-bold mt-1 text-foreground">{aboutSettings.heading}</h4>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{aboutSettings.body}</p>
                      </div>
                      <div className="md:col-span-5 grid grid-cols-2 gap-4">
                        <div className="bg-muted/40 p-4 rounded-xl border text-center">
                          <span className="block text-xl font-extrabold text-blue-600">{aboutSettings.yearsCount}</span>
                          <span className="text-[10px] text-muted-foreground font-medium">Of Excellence</span>
                        </div>
                        <div className="bg-muted/40 p-4 rounded-xl border text-center">
                          <span className="block text-xl font-extrabold text-blue-600">{aboutSettings.studentSuccessRate}</span>
                          <span className="text-[10px] text-muted-foreground font-medium">Placement Rate</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Section 3: Features */}
                  {featuresSettings.showCards && (
                    <div
                      onClick={() => setSelectedElement('features')}
                      className={`p-10 border-2 border-t-0 border-transparent transition-all cursor-pointer group flex flex-col justify-center relative ${selectedElement === 'features' ? 'border-blue-500 bg-blue-50/5 dark:bg-blue-950/10' : 'border-transparent hover:border-blue-500/30'}`}
                    >
                      <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        [Edit Features Section]
                      </span>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-card p-4 rounded-xl border hover:shadow-md transition-shadow">
                          <Sparkles className="size-5 text-blue-600 mb-2" />
                          <h5 className="font-semibold text-xs text-foreground mb-1">{featuresSettings.card1Title}</h5>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">Providing high-standard British curriculum from Cambridge.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border hover:shadow-md transition-shadow">
                          <Sparkles className="size-5 text-blue-600 mb-2" />
                          <h5 className="font-semibold text-xs text-foreground mb-1">{featuresSettings.card2Title}</h5>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">Innovative robotics labs designing smart solutions.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border hover:shadow-md transition-shadow">
                          <Sparkles className="size-5 text-blue-600 mb-2" />
                          <h5 className="font-semibold text-xs text-foreground mb-1">{featuresSettings.card3Title}</h5>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">Championship sport clubs and creative visual designs.</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right side: Visual Sandbox Customizer Controls Inspector */}
            <aside className="w-80 shrink-0 bg-card border-l border-border flex flex-col overflow-y-auto">
              {/* Tabs */}
              <div className="p-4 border-b border-border bg-muted/30">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders className="size-3.5 text-blue-600" />
                  Property Inspector
                </span>
                <p className="text-[10px] text-muted-foreground mt-1">Configure layout options for the selected element</p>
              </div>

              {/* Inspector Content */}
              <div className="flex-1 p-5 space-y-6">
                
                {/* Hero Section customizer controls */}
                {selectedElement === 'hero' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Layout className="size-4 text-blue-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wide">Hero Settings</h4>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="badgeText" className="text-xs font-medium text-foreground">Badge Text</label>
                      <input
                        id="badgeText"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={heroSettings.badge}
                        onChange={(e) => setHeroSettings({ ...heroSettings, badge: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="heroTitle" className="text-xs font-medium text-foreground">Hero Title Line 1</label>
                      <input
                        id="heroTitle"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={heroSettings.title}
                        onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="heroAccent" className="text-xs font-medium text-foreground">Gradient Accent Text</label>
                      <input
                        id="heroAccent"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={heroSettings.accentText}
                        onChange={(e) => setHeroSettings({ ...heroSettings, accentText: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="ctaText" className="text-xs font-medium text-foreground">Button CTA Label</label>
                      <input
                        id="ctaText"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={heroSettings.ctaLabel}
                        onChange={(e) => setHeroSettings({ ...heroSettings, ctaLabel: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="bgOverlay" className="text-xs font-medium text-foreground">Background Overlay</label>
                        <span className="text-[10px] font-mono text-muted-foreground">{heroSettings.overlayOpacity}%</span>
                      </div>
                      <input
                        id="bgOverlay"
                        type="range"
                        min="10"
                        max="90"
                        className="w-full cursor-pointer accent-blue-600"
                        value={heroSettings.overlayOpacity}
                        onChange={(e) => setHeroSettings({ ...heroSettings, overlayOpacity: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Gradient Style Theme</label>
                      <div className="grid grid-cols-4 gap-1.5 mt-1">
                        {(['blue', 'purple', 'red', 'emerald'] as const).map((col) => (
                          <button
                            key={col}
                            onClick={() => setHeroSettings({ ...heroSettings, themeColor: col })}
                            className={`px-2 py-1 rounded text-[10px] font-bold capitalize border transition-all ${heroSettings.themeColor === col ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-muted text-foreground'}`}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">Text Alignment</label>
                      <div className="grid grid-cols-3 gap-1.5 mt-1">
                        {(['left', 'center', 'right'] as const).map((align) => (
                          <button
                            key={align}
                            onClick={() => setHeroSettings({ ...heroSettings, alignment: align })}
                            className={`px-2 py-1 rounded text-[10px] font-bold capitalize border transition-all ${heroSettings.alignment === align ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-muted text-foreground'}`}
                          >
                            {align}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section customizer controls */}
                {selectedElement === 'about' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Type className="size-4 text-blue-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wide">About Settings</h4>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="aboutHeading" className="text-xs font-medium text-foreground">Section Heading</label>
                      <input
                        id="aboutHeading"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={aboutSettings.heading}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, heading: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="aboutDesc" className="text-xs font-medium text-foreground">Body Text Description</label>
                      <textarea
                        id="aboutDesc"
                        rows={4}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none resize-y"
                        value={aboutSettings.body}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, body: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="yearsCount" className="text-xs font-medium text-foreground">Years Counter Label</label>
                      <input
                        id="yearsCount"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={aboutSettings.yearsCount}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, yearsCount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="successRate" className="text-xs font-medium text-foreground">Placement Counter Label</label>
                      <input
                        id="successRate"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={aboutSettings.studentSuccessRate}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, studentSuccessRate: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Features Section customizer controls */}
                {selectedElement === 'features' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Sparkles className="size-4 text-blue-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wide">Features Settings</h4>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">Show Features block</span>
                      <input
                        id="showCardsCheck"
                        aria-label="Show Features block"
                        type="checkbox"
                        className="size-4 cursor-pointer accent-blue-600"
                        checked={featuresSettings.showCards}
                        onChange={(e) => setFeaturesSettings({ ...featuresSettings, showCards: e.target.checked })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="card1" className="text-xs font-medium text-foreground">Card 1 Title</label>
                      <input
                        id="card1"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={featuresSettings.card1Title}
                        onChange={(e) => setFeaturesSettings({ ...featuresSettings, card1Title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="card2" className="text-xs font-medium text-foreground">Card 2 Title</label>
                      <input
                        id="card2"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={featuresSettings.card2Title}
                        onChange={(e) => setFeaturesSettings({ ...featuresSettings, card2Title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="card3" className="text-xs font-medium text-foreground">Card 3 Title</label>
                      <input
                        id="card3"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={featuresSettings.card3Title}
                        onChange={(e) => setFeaturesSettings({ ...featuresSettings, card3Title: e.target.value })}
                      />
                    </div>
                  </div>
                )}

              </div>
              <div className="p-4 border-t bg-muted/20 text-center">
                <p className="text-[9px] text-muted-foreground font-mono">Sandbox Local draft state • v1.1.2</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
