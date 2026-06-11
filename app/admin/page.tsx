'use client'

import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import Link from 'next/link'
import { FileEdit, School, ArrowRight, Globe, Settings } from 'lucide-react'

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
    icon: Globe,
    label: 'View Website',
    desc: 'Open the public website in a new tab to preview your changes.',
    href: '/',
    colour: 'bg-purple-600/10 text-purple-600',
    external: true,
  },
  {
    icon: Settings,
    label: 'Settings',
    desc: 'Manage admin credentials and site-wide configuration.',
    href: '/admin/settings',
    colour: 'bg-orange-600/10 text-orange-600',
  },
]

const pages = ['home', 'about', 'academics', 'admissions', 'careers', 'contact', 'schools']

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 max-w-5xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Welcome back. Manage your website content from here.</p>
            </div>

            {/* Quick links */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {quickLinks.map(({ icon: Icon, label, desc, href, colour, external }) => (
                <Link
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col gap-3"
                >
                  <div className={`size-9 rounded-lg flex items-center justify-center ${colour}`}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pages overview */}
            <div className="mb-6">
              <h2 className="text-base font-semibold mb-4">Page Sections</h2>
              <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={page === 'schools' ? '/admin/cms/schools' : `/admin/cms/pages?page=${page}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <span className="font-medium text-sm capitalize">{page}</span>
                      <span className="ml-2 text-xs text-muted-foreground">/{page === 'home' ? '' : page}</span>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
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
