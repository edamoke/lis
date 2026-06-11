'use client'

import { useState, useEffect } from 'react'
import { loadSections, type CmsSection } from '@/lib/cms-store'

/**
 * Returns the CMS section matching the given page + type, or null if not found / disabled.
 * Re-renders whenever the admin saves a change (listens to 'lis-cms-update').
 */
export function useCmsSection(page: string, type: CmsSection['type']): CmsSection | null {
  const [section, setSection] = useState<CmsSection | null>(null)

  function find() {
    const all = loadSections()
    const match = all.find((s) => s.page === page && s.type === type && s.enabled) ?? null
    setSection(match)
  }

  useEffect(() => {
    find()
    window.addEventListener('lis-cms-update', find)
    return () => window.removeEventListener('lis-cms-update', find)
  }, [page, type])

  return section
}
