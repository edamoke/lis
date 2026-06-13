'use client'

import React, { useState, useEffect } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Users,
  Plus,
  Trash2,
  MapPin,
  Clock,
  Mail,
  FileSpreadsheet,
  TrendingUp,
  RefreshCw
} from 'lucide-react'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('Nairobi Karen')
  const [date, setDate] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('100')
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [eventsRes, regsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/event-registrations')
      ])

      const eventsData = await eventsRes.json()
      const regsData = await regsRes.json()

      if (eventsData.data) setEvents(eventsData.data)
      if (regsData.data) setRegistrations(regsData.data)
    } catch (err) {
      console.error('Error fetching admin event data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (!title || !city || !date) {
      setFormError('Please fill in Title, City, and Date fields.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          city,
          date,
          max_capacity: parseInt(maxCapacity) || null
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create event')
      }

      setFormSuccess('Event successfully created!')
      setTitle('')
      setDescription('')
      setDate('')
      setMaxCapacity('100')
      fetchData() // Refresh data
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred.')
    } finally {
      setSubmitting(false)
    }
  }

  const getCapacityCount = (eventId: string) => {
    return registrations.filter(r => r.event_id === eventId).length
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/15">
          <div className="px-8 py-8 max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Events & Lanyard Bookings</h1>
                <p className="mt-1 text-sm text-muted-foreground">Manage school events, track registration capacity, and review dynamic 3D lanyard bookings.</p>
              </div>
              <Button onClick={fetchData} variant="outline" size="sm" className="gap-2 shrink-0 self-start">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Events</span>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-extrabold text-foreground">{events.length}</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Bookings</span>
                  <Users className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-extrabold text-foreground">{registrations.length}</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lanyard Downloads</span>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-2xl font-extrabold text-foreground">{registrations.length} downloads</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
              {/* Event Creation Form */}
              <div className="md:col-span-4 rounded-xl border border-border bg-card p-5 h-fit space-y-4">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-blue-600" />
                  <h3 className="font-bold text-sm">Create New Event</h3>
                </div>
                <form onSubmit={handleCreateEvent} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground block">Event Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. STEM Expo"
                      className="h-8 w-full rounded-md border border-border bg-background px-3 py-1 font-sans text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground block">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Event details..."
                      rows={2}
                      className="w-full rounded-md border border-border bg-background px-3 py-1 font-sans text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="campusCitySelect" className="text-[11px] font-mono text-muted-foreground block">Campus City/Branch</label>
                    <select
                      id="campusCitySelect"
                      title="Campus City/Branch"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-background px-3 py-1 font-sans text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="Nairobi Karen">Nairobi Karen</option>
                      <option value="Nairobi Lavington">Nairobi Lavington</option>
                      <option value="Mombasa Campus">Mombasa Campus</option>
                      <option value="Malindi Campus">Malindi Campus</option>
                      <option value="Nairobi Kindergarten">Nairobi Kindergarten</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground block">Date Label (Lanyard format)</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. 05.02.2026"
                      className="h-8 w-full rounded-md border border-border bg-background px-3 py-1 font-sans text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-muted-foreground block">Max Capacity</label>
                    <input
                      type="number"
                      value={maxCapacity}
                      onChange={(e) => setMaxCapacity(e.target.value)}
                      placeholder="100"
                      className="h-8 w-full rounded-md border border-border bg-background px-3 py-1 font-sans text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  {formError && (
                    <p className="text-[11px] text-destructive font-mono bg-destructive/10 p-2 rounded">{formError}</p>
                  )}

                  {formSuccess && (
                    <p className="text-[11px] text-emerald-500 font-mono bg-emerald-500/10 p-2 rounded">{formSuccess}</p>
                  )}

                  <Button type="submit" disabled={submitting} size="sm" className="w-full h-8 mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                    {submitting ? 'Creating...' : 'Create Event'}
                  </Button>
                </form>
              </div>

              {/* Event List & Capacity Tracker */}
              <div className="md:col-span-8 space-y-6">
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-border bg-muted/20">
                    <h3 className="font-bold text-sm">Active Events</h3>
                  </div>
                  {loading ? (
                    <div className="p-8 flex justify-center items-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  ) : events.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No events found. Create one to get started!</div>
                  ) : (
                    <div className="divide-y divide-border">
                      {events.map((event) => {
                        const count = getCapacityCount(event.id)
                        const capacityPercentage = event.max_capacity ? Math.min((count / event.max_capacity) * 100, 100) : 0

                        return (
                          <div key={event.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5 text-red-400" />
                                  {event.city}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                                  {event.date}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <div className="text-right space-y-1">
                                <span className="text-xs font-semibold">
                                  {count} / {event.max_capacity || '∞'} Booked
                                </span>
                                {event.max_capacity && (
                                  <div className="w-24 bg-muted h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full" style={{ width: `${capacityPercentage}%` }} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Bookings & Registrations Table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                    <h3 className="font-bold text-sm">Attendee Registrations</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-mono">
                      {registrations.length} Total
                    </span>
                  </div>
                  {loading ? (
                    <div className="p-8 flex justify-center items-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  ) : registrations.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No bookings recorded yet. Visitors can register via the 3D Lanyard!</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-border bg-muted/10 font-medium text-muted-foreground">
                            <th className="p-3">Attendee Name</th>
                            <th className="p-3">Email Address</th>
                            <th className="p-3">Event Selected</th>
                            <th className="p-3">Campus Branch</th>
                            <th className="p-3">Registered At</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {registrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-muted/5">
                              <td className="p-3 font-semibold text-foreground">{reg.participant_name}</td>
                              <td className="p-3 text-muted-foreground flex items-center gap-1.5">
                                <Mail className="h-3 w-3" />
                                {reg.email}
                              </td>
                              <td className="p-3 text-foreground font-medium">{reg.events?.title || 'N/A'}</td>
                              <td className="p-3 text-muted-foreground">{reg.events?.city || 'N/A'}</td>
                              <td className="p-3 text-muted-foreground font-mono">
                                {new Date(reg.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
