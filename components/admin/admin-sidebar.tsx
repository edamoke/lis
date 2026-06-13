'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  FileEdit,
  School,
  Settings,
  LogOut,
  ChevronRight,
  Globe,
  Sparkles,
  Columns,
  Maximize2,
  Calendar
} from 'lucide-react'
import { adminLogout } from '@/lib/cms-store'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'CMS',
    href: '/admin/cms',
    icon: FileEdit,
    children: [
      { label: 'All Sections', href: '/admin/cms' },
      { label: 'Home', href: '/admin/cms/pages?page=home' },
      { label: 'About', href: '/admin/cms/pages?page=about' },
      { label: 'Academics', href: '/admin/cms/pages?page=academics' },
      { label: 'Admissions', href: '/admin/cms/pages?page=admissions' },
      { label: 'Careers', href: '/admin/cms/pages?page=careers' },
      { label: 'Contact', href: '/admin/cms/pages?page=contact' },
      { label: 'Schools', href: '/admin/cms/schools' },
    ],
  },
  {
    label: 'Visual Builder',
    href: '/admin/website-builder',
    icon: Maximize2,
  },
  {
    label: 'AI News & Content',
    href: '/admin/ai-news',
    icon: Sparkles,
  },
  {
    label: 'Admissions Kanban',
    href: '/admin/kanban',
    icon: Columns,
  },
  {
    label: 'Events & Bookings',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    adminLogout()
    router.push('/admin/login')
  }

  return (
    <aside className="flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-card border-r border-border overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoe2-eXj4lw1EpKiFCgxXXVYOWalbObTTwo.png"
          alt="LIS Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <div>
          <p className="text-sm font-semibold leading-none">LIS Admin</p>
          <p className="text-xs text-muted-foreground mt-0.5">Content Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.children && <ChevronRight className="size-3.5 shrink-0 opacity-50" />}
              </Link>
              {/* Sub-items */}
              {item.children && isActive && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-xs transition-colors',
                        pathname + (typeof window !== 'undefined' ? window.location.search : '') === child.href
                          ? 'bg-accent text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Globe className="size-4" />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
