'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { loadSections, saveSections, resetSections, type CmsSection } from '@/lib/cms-store'
import { Eye, EyeOff, Pencil, GripVertical, RotateCcw, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import SectionEditModal from '@/components/admin/section-edit-modal'

const PAGE_COLOURS: Record<string, string> = {
  home: 'bg-blue-600/10 text-blue-700 dark:text-blue-400',
  about: 'bg-green-600/10 text-green-700 dark:text-green-400',
  academics: 'bg-indigo-600/10 text-indigo-700 dark:text-indigo-400',
  admissions: 'bg-orange-600/10 text-orange-700 dark:text-orange-400',
  careers: 'bg-purple-600/10 text-purple-700 dark:text-purple-400',
  contact: 'bg-rose-600/10 text-rose-700 dark:text-rose-400',
  schools: 'bg-teal-600/10 text-teal-700 dark:text-teal-400',
}

function pageColour(page: string) {
  const key = page.split('/')[0]
  return PAGE_COLOURS[key] ?? 'bg-zinc-600/10 text-zinc-600'
}

export default function CmsIndexPage() {
  const [sections, setSections] = useState<CmsSection[]>([])
  const [editing, setEditing] = useState<CmsSection | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setSections(loadSections())
    const onUpdate = () => setSections(loadSections())
    window.addEventListener('lis-cms-update', onUpdate)
    return () => window.removeEventListener('lis-cms-update', onUpdate)
  }, [])

  function toggleEnabled(id: string) {
    const updated = sections.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s)
    setSections(updated)
    saveSections(updated)
  }

  function deleteSection(id: string) {
    if (!confirm('Delete this section? This cannot be undone.')) return
    const updated = sections.filter((s) => s.id !== id)
    setSections(updated)
    saveSections(updated)
  }

  function handleSave(updated: CmsSection) {
    const next = sections.map((s) => s.id === updated.id ? updated : s)
    setSections(next)
    saveSections(next)
    setEditing(null)
  }

  function handleReset() {
    if (!confirm('Reset all sections to defaults? All edits will be lost.')) return
    resetSections()
    setSections(loadSections())
  }

  const visible = filter
    ? sections.filter((s) => s.label.toLowerCase().includes(filter.toLowerCase()) || s.page.toLowerCase().includes(filter.toLowerCase()))
    : sections

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">CMS — All Sections</h1>
                <p className="mt-1 text-sm text-muted-foreground">Edit, toggle, or remove any section across the website.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleReset}>
                  <RotateCcw className="size-3.5 mr-1.5" />
                  Reset Defaults
                </Button>
              </div>
            </div>

            {/* Filter */}
            <input
              type="search"
              placeholder="Filter sections..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full max-w-sm rounded-lg border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/40 mb-6"
            />

            {/* Sections table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_120px_80px_100px] gap-4 px-5 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Section</span>
                <span>Page</span>
                <span>Type</span>
                <span>Actions</span>
              </div>
              <div className="divide-y divide-border">
                {visible.map((section) => (
                  <div
                    key={section.id}
                    className={cn(
                      'grid sm:grid-cols-[1fr_120px_80px_100px] gap-4 items-center px-5 py-4 transition-colors',
                      !section.enabled && 'opacity-50'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <GripVertical className="size-4 text-muted-foreground shrink-0 cursor-grab" />
                      <span className="text-sm font-medium truncate">{section.label}</span>
                    </div>
                    <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium w-fit', pageColour(section.page))}>
                      {section.page}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">{section.type}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleEnabled(section.id)}
                        title={section.enabled ? 'Disable section' : 'Enable section'}
                        className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {section.enabled ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                      </button>
                      <button
                        onClick={() => setEditing(section)}
                        title="Edit section"
                        className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        title="Delete section"
                        className="p-1.5 rounded-md hover:bg-red-600/10 transition-colors text-muted-foreground hover:text-red-600"
                      >
                        <span className="text-xs font-bold leading-none">✕</span>
                      </button>
                    </div>
                  </div>
                ))}
                {visible.length === 0 && (
                  <div className="px-5 py-12 text-center text-sm text-muted-foreground">No sections found.</div>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {sections.filter((s) => s.enabled).length} of {sections.length} sections enabled.
              Changes save automatically and reflect on the front end immediately.
            </p>
          </div>
        </main>
      </div>

      {/* Edit modal */}
      {editing && (
        <SectionEditModal
          section={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </AdminGuard>
  )
}
