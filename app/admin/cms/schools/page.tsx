'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { loadSections, saveSections, type CmsSection } from '@/lib/cms-store'
import { schools } from '@/lib/schools-data'
import { Pencil, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionEditModal from '@/components/admin/section-edit-modal'
import Image from 'next/image'
import Link from 'next/link'

const imageMap: Record<string, string> = {
  'nairobi-karen': '/schools/nairobi-karen.png',
  'nairobi-lavington': '/schools/nairobi-lavington.png',
  'nairobi-kindergarten': '/schools/nairobi-kindergarten.png',
  'mombasa': '/schools/mombasa.png',
  'malindi': '/schools/malindi.png',
}

export default function CmsSchoolsPage() {
  const [all, setAll] = useState<CmsSection[]>([])
  const [editing, setEditing] = useState<CmsSection | null>(null)

  useEffect(() => {
    setAll(loadSections())
    const onUpdate = () => setAll(loadSections())
    window.addEventListener('lis-cms-update', onUpdate)
    return () => window.removeEventListener('lis-cms-update', onUpdate)
  }, [])

  function heroForSchool(slug: string) {
    return all.find((s) => s.page === `schools/${slug}` && s.type === 'hero') ?? null
  }

  function handleSave(updated: CmsSection) {
    const next = all.map((s) => s.id === updated.id ? updated : s)
    setAll(next)
    saveSections(next)
    setEditing(null)
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 max-w-5xl">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">CMS — Schools</h1>
              <p className="mt-1 text-sm text-muted-foreground">Edit the hero section and content for each campus.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => {
                const hero = heroForSchool(school.slug)
                const img = (hero?.content.image as string) ?? imageMap[school.slug] ?? '/schools/nairobi-karen.png'

                return (
                  <div key={school.slug} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image src={img} alt={school.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-xs font-medium text-white">{school.city}</span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div>
                        <p className="font-semibold text-sm">{school.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{school.grades}</p>
                      </div>
                      {hero && (
                        <div className="text-xs text-muted-foreground bg-accent/50 rounded-lg px-3 py-2 space-y-1">
                          <p><span className="font-medium">Title:</span> {String(hero.content.title)}</p>
                          <p><span className="font-medium">Subtitle:</span> {String(hero.content.subtitle).slice(0, 60)}…</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-auto">
                        {hero && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setEditing(hero)}
                          >
                            <Pencil className="size-3.5 mr-1.5" />
                            Edit Hero
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/schools/${school.slug}`} target="_blank">
                            <ExternalLink className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
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
