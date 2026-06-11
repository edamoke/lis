'use client'

import { useState } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { resetSections } from '@/lib/cms-store'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function AdminSettingsPage() {
  const [resetDone, setResetDone] = useState(false)

  function handleReset() {
    if (!confirm('Reset ALL CMS content to factory defaults? This cannot be undone.')) return
    resetSections()
    setResetDone(true)
    setTimeout(() => setResetDone(false), 3000)
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-8 py-8 max-w-2xl">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">Site-wide configuration and admin options.</p>
            </div>

            {/* Admin credentials info */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h2 className="font-semibold text-base mb-4">Admin Credentials</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground w-24">Username</span>
                  <code className="bg-accent rounded px-2 py-0.5">admin</code>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground w-24">Password</span>
                  <code className="bg-accent rounded px-2 py-0.5">HobbitHobbitKing@20132</code>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                To change credentials, update <code>ADMIN_CREDENTIALS</code> in <code>lib/cms-store.ts</code>.
              </p>
            </div>

            {/* CMS data */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h2 className="font-semibold text-base mb-2">CMS Data</h2>
              <p className="text-sm text-muted-foreground mb-4">
                All CMS edits are stored in <code>localStorage</code> in the browser and are applied in real time on the front end.
                Resetting will restore all sections to their factory defaults.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="destructive" size="sm" onClick={handleReset}>
                  <AlertTriangle className="size-3.5 mr-1.5" />
                  Reset All CMS Data
                </Button>
                {resetDone && (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle className="size-4" /> Reset complete.
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-semibold text-base mb-2">About This Dashboard</h2>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Navigate to <strong>CMS &rarr; All Sections</strong> to view and edit every section.</li>
                <li>Use the <strong>Page filter</strong> (CMS &rarr; Pages) to edit sections for a specific page.</li>
                <li>Use <strong>Schools</strong> to update hero images and descriptions for each campus.</li>
                <li>Toggle sections on/off to show or hide them on the front end without deleting them.</li>
                <li>Changes are applied immediately — open the website in another tab to preview.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
