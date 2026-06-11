'use client'

import { useState } from 'react'
import { X, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type CmsSection } from '@/lib/cms-store'

interface Props {
  section: CmsSection
  onSave: (updated: CmsSection) => void
  onClose: () => void
}

const FIELD_LABELS: Record<string, string> = {
  badge: 'Badge Text',
  title: 'Title',
  titleAccent: 'Accent Title (gradient part)',
  subtitle: 'Subtitle / Description',
  image: 'Image Path (e.g. /heroes/about.png)',
  ctaPrimary: 'Primary CTA Button',
  ctaSecondary: 'Secondary CTA Button',
  heading: 'Section Heading',
  card1Title: 'Card 1 Title',
  card1Body: 'Card 1 Body',
  card2Title: 'Card 2 Title',
  card2Body: 'Card 2 Body',
  card3Title: 'Card 3 Title',
  card3Body: 'Card 3 Body',
  quote: 'Quote Text',
  attribution: 'Quote Attribution',
  body: 'Body Text',
  ctaBody: 'CTA Body',
}

export default function SectionEditModal({ section, onSave, onClose }: Props) {
  const [content, setContent] = useState<Record<string, string | string[]>>({ ...section.content })
  const [label, setLabel] = useState(section.label)
  const [enabled, setEnabled] = useState(section.enabled)

  function handleChange(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    onSave({ ...section, label, enabled, content })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-base">Edit Section</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-accent transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
          {/* Meta */}
          <div className="grid gap-4 sm:grid-cols-2 pb-4 border-b border-border">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/40"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visibility</label>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setEnabled(true)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${enabled ? 'bg-blue-600 text-white border-blue-600' : 'border-border text-muted-foreground hover:bg-accent'}`}
                >
                  Visible
                </button>
                <button
                  onClick={() => setEnabled(false)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${!enabled ? 'bg-zinc-600 text-white border-zinc-600' : 'border-border text-muted-foreground hover:bg-accent'}`}
                >
                  Hidden
                </button>
              </div>
            </div>
          </div>

          {/* Content fields */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Content</p>
            <div className="space-y-4">
              {Object.entries(content).map(([key, value]) => {
                const fieldLabel = FIELD_LABELS[key] ?? key
                const isLong = ['subtitle', 'body', 'quote', 'description', 'card1Body', 'card2Body', 'card3Body', 'ctaBody'].includes(key)
                return (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium">{fieldLabel}</label>
                    {isLong ? (
                      <textarea
                        value={typeof value === 'string' ? value : value.join(', ')}
                        onChange={(e) => handleChange(key, e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/40 resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={typeof value === 'string' ? value : value.join(', ')}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/40"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="size-3.5 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
