'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { loadSections, saveSections, DEFAULT_SECTIONS, type CmsSection } from '@/lib/cms-store'
import { Eye, EyeOff, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionEditModal from '@/components/admin/section-edit-modal'
import { cn } from '@/lib/utils'

const TYPE_COLOURS: Record<string, string> = {
  hero: 'bg-blue-600/10 text-blue-700 dark:text-blue-400',
  text: 'bg-green-600/10 text-green-700 dark:text-green-400',
  cards: 'bg-purple-600/10 text-purple-700 dark:text-purple-400',
  cta: 'bg-orange-600/10 text-orange-700 dark:text-orange-400',
  list: 'bg-teal-600/10 text-teal-700 dark:text-teal-400',
}

function CmsPagesInner() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? 'home'
  const [all, setAll] = useState<CmsSection[]>([])
  const [editing, setEditing] = useState<CmsSection | null>(null)

  useEffect(() => {
    setAll(loadSections())
    const onUpdate = () => setAll(loadSections())
    window.addEventListener('lis-cms-update', onUpdate)
    return () => window.removeEventListener('lis-cms-update', onUpdate)
  }, [])

  const sections = all
    .filter((s) => s.page === page)
    .sort((a, b) => a.order - b.order)

  function toggleEnabled(id: string) {
    const updated = all.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s)
    setAll(updated)
    saveSections(updated)
  }

  function handleSave(updated: CmsSection) {
    const next = all.map((s) => s.id === updated.id ? updated : s)
    setAll(next)
    saveSections(next)
    setEditing(null)
  }

  function addSection() {
    const newSection: CmsSection = {
      id: `${page}-custom-${Date.now()}`,
      page,
      type: 'text',
      label: `${page} — New Section`,
      enabled: true,
      order: sections.length,
      content: { heading: 'New Section', body: 'Edit this content in the CMS.' },
    }
    const updated = [...all, newSection]
    setAll(updated)
    saveSections(updated)
    setEditing(newSection)
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold capitalize">{page} — Sections</h1>
                <p className="mt-1 text-sm text-muted-foreground">Manage all editable sections for the <strong>{page}</strong> page.</p>
              </div>
              <Button size="sm" onClick={addSection}>
                <Plus className="size-3.5 mr-1.5" />
                Add Section
              </Button>
            </div>

            {/* Page nav */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['home','about','academics','admissions','careers','contact'].map((p) => (
                <a
                  key={p}
                  href={`?page=${p}`}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize',
                    page === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-border text-muted-foreground hover:bg-accent'
                  )}
                >
                  {p}
                </a>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-3">
              {sections.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                  No sections for this page yet.
                  <br />
                  <button onClick={addSection} className="mt-2 text-blue-600 hover:underline">Add the first section</button>
                </div>
              )}
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={cn(
                    'rounded-xl border border-border bg-card px-5 py-4 flex items-center gap-4 transition-opacity',
                    !section.enabled && 'opacity-50'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{section.label}</span>
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', TYPE_COLOURS[section.type] ?? 'bg-zinc-100 text-zinc-600')}>
                        {section.type}
                      </span>
                      {!section.enabled && (
                        <span className="rounded-full bg-zinc-600/10 text-zinc-500 px-2 py-0.5 text-xs">hidden</span>
                      )}
                    </div>
                    {section.content.title && (
                      <p className="mt-1 text-xs text-muted-foreground truncate">{String(section.content.title)}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleEnabled(section.id)}
                      title={section.enabled ? 'Hide' : 'Show'}
                      className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {section.enabled ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                    </button>
                    <Button size="sm" variant="outline" onClick={() => setEditing(section)}>
                      <Pencil className="size-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {editing && (
        <SectionEditModal section={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </AdminGuard>
  )
}

export default function CmsPagesPage() {
  return (
    <Suspense>
      <CmsPagesInner />
    </Suspense>
  )
}
