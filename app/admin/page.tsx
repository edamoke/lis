'use client'

import React, { useState } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import Link from 'next/link'
import {
  FileEdit,
  School,
  ArrowRight,
  Globe,
  Settings,
  Users,
  GraduationCap,
  Calendar,
  TrendingUp,
  Clock,
  Sparkles,
  Columns,
  Maximize2,
  CheckCircle,
  TrendingDown,
  ChevronRight
} from 'lucide-react'

const quickLinks = [
  {
    icon: FileEdit,
    label: 'Edit All Sections',
    desc: 'View and edit every content section across all pages.',
    href: '/admin/cms',
    colour: 'bg-blue-600/10 text-blue-600',
  },
  {
    icon: School,
    label: 'Manage Schools',
    desc: 'Edit hero images, descriptions, and contact details for each campus.',
    href: '/admin/cms/schools',
    colour: 'bg-green-600/10 text-green-600',
  },
  {
    icon: Maximize2,
    label: 'Visual Site Builder',
    desc: 'Mock visual customizer controls and drag-and-drop hierarchy.',
    href: '/admin/website-builder',
    colour: 'bg-purple-600/10 text-purple-600',
  },
  {
    icon: Sparkles,
    label: 'AI News Writer',
    desc: 'Generate marketing announcements, emails, or newsletters.',
    href: '/admin/ai-news',
    colour: 'bg-amber-600/10 text-amber-600',
  },
]

const pages = ['home', 'about', 'academics', 'admissions', 'careers', 'contact', 'schools']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'campus' | 'trend'>('campus')

  const metrics = [
    { label: 'Total Inquiries', value: '1,284', trend: '+14.2%', isPositive: true, desc: 'vs previous 30 days', icon: Users, color: 'text-blue-600 bg-blue-500/10' },
    { label: 'Active Students', value: '3,450', trend: '+5.8%', isPositive: true, desc: 'Current enrollment cap', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-500/10' },
    { label: 'Conversion Rate', value: '74.2%', trend: '+3.1%', isPositive: true, desc: 'Inquiry to registered', icon: TrendingUp, color: 'text-purple-600 bg-purple-500/10' },
    { label: 'Pending Assessment', value: '28', trend: '-2.4%', isPositive: false, desc: 'Needs registrar booking', icon: Clock, color: 'text-amber-600 bg-amber-500/10' },
  ]

  const campusShare = [
    { campus: 'Nairobi Karen', share: '38%', count: 488, color: 'bg-blue-600' },
    { campus: 'Nairobi Lavington', share: '24%', count: 308, color: 'bg-purple-600' },
    { campus: 'Mombasa Campus', share: '18%', count: 231, color: 'bg-red-600' },
    { campus: 'Nairobi Kindergarten', share: '12%', count: 154, color: 'bg-amber-600' },
    { campus: 'Malindi Campus', share: '8%', count: 103, color: 'bg-emerald-600' },
  ]

  const monthlyTrend = [
    { month: 'Jan', count: 120, height: 'h-16' },
    { month: 'Feb', count: 145, height: 'h-20' },
    { month: 'Mar', count: 190, height: 'h-28' },
    { month: 'Apr', count: 220, height: 'h-32' },
    { month: 'May', count: 290, height: 'h-40' },
    { month: 'Jun', count: 319, height: 'h-44' },
  ]

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/15">
          <div className="px-8 py-8 max-w-5xl mx-auto space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="mt-1 text-sm text-muted-foreground">Real-time Cambridge enrollment metrics, newsletter statistics, and campus performance indicators.</p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m, idx) => {
                const Icon = m.icon
                return (
                  <div key={idx} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.label}</span>
                      <div className={`size-8 rounded-lg flex items-center justify-center ${m.color}`}>
                        <Icon className="size-4" />
                      </div>
                    </div>
                    <div>
                      <span className="text-2xl font-extrabold text-foreground">{m.value}</span>
                      <div className="flex items-center gap-1.5 mt-1 text-xs">
                        <span className={`font-semibold flex items-center gap-0.5 ${m.isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {m.isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                          {m.trend}
                        </span>
                        <span className="text-muted-foreground">{m.desc}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Highly Polished Custom SVG / HTML Charts & Analytics Block */}
            <div className="grid gap-6 md:grid-cols-12">
              
              {/* Left Column: Campus or Volume charts */}
              <div className="md:col-span-7 bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">Admissions & Volume Performance</h3>
                    <p className="text-[10px] text-muted-foreground">Inquiry volume distributions and growth metrics</p>
                  </div>
                  <div className="flex rounded-lg border bg-muted/30 p-1">
                    <button
                      onClick={() => setActiveTab('campus')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded ${activeTab === 'campus' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Campuses
                    </button>
                    <button
                      onClick={() => setActiveTab('trend')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded ${activeTab === 'trend' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Trends
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-center">
                  {activeTab === 'campus' ? (
                    <div className="space-y-4">
                      {campusShare.map((share, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-foreground flex items-center gap-2">
                              <span className={`size-2.5 rounded-full ${share.color}`} />
                              {share.campus}
                            </span>
                            <span className="font-mono text-muted-foreground">{share.count} inquiries ({share.share})</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${share.color}`} style={{ width: share.share }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-end justify-between h-48 pt-6 border-b border-border px-4">
                      {monthlyTrend.map((t, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] px-2 py-0.5 rounded font-mono shadow-md mb-1">
                            {t.count}
                          </div>
                          <div className={`w-8 bg-blue-600 rounded-t-md hover:bg-blue-500 transition-colors ${t.height}`} />
                          <span className="text-[10px] font-bold text-muted-foreground mt-1">{t.month}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Key Enrollment Actions / Pipeline */}
              <div className="md:col-span-5 bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm">Admissions Pipeline Status</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Stages and conversion ratios</p>
                </div>

                <div className="space-y-3.5 my-4 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/20 border">
                    <span className="text-xs font-semibold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-blue-500" />
                      Inquiry lodged
                    </span>
                    <span className="font-mono text-xs font-extrabold text-foreground">1,284 students (100%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/20 border">
                    <span className="text-xs font-semibold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-amber-500" />
                      Evaluated & Interviewed
                    </span>
                    <span className="font-mono text-xs font-extrabold text-foreground">1,102 students (85.8%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/20 border">
                    <span className="text-xs font-semibold flex items-center gap-2">
                      <span className="size-2 rounded-full bg-purple-500" />
                      Academic offer extended
                    </span>
                    <span className="font-mono text-xs font-extrabold text-foreground">953 students (74.2%)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Enrolment rate: <strong>+3.4%</strong> vs 2025</span>
                  <Link href="/admin/kanban" className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline">
                    View Board <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Quick action buttons Panel */}
            <div className="space-y-4">
              <h2 className="text-base font-bold tracking-tight">Core Content Panels</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map(({ icon: Icon, label, desc, href, colour }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col gap-3 group"
                  >
                    <div className={`size-9 rounded-lg flex items-center justify-center ${colour}`}>
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm flex items-center gap-1">
                        {label}
                        <ArrowRight className="size-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Page Sections CMS Directory overview */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider">Public Page Sections CMS</h3>
                  <p className="text-[10px] text-muted-foreground">Instantly configure section overrides on any route</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={page === 'schools' ? '/admin/cms/schools' : `/admin/cms/pages?page=${page}`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-xs capitalize">{page}</span>
                      <span className="ml-2 text-[10px] text-muted-foreground">/{page === 'home' ? '' : page}</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
