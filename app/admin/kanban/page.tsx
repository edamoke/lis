'use client'

import React, { useState } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { Columns, Search, Filter, Plus, ChevronRight, User, GraduationCap, MapPin, Calendar, Check, AlertCircle, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface Inquiry {
  id: string
  studentName: string
  grade: string
  campus: string
  parentName: string
  phone: string
  date: string
  status: 'new' | 'review' | 'assessment' | 'offer' | 'enrolled'
}

const INITIAL_INQUIRIES: Inquiry[] = [
  { id: '1', studentName: 'Ethan Kamau', grade: 'Year 10', campus: 'Nairobi Karen', parentName: 'Francis Kamau', phone: '+254 711 098 765', date: '2026-06-10', status: 'new' },
  { id: '2', studentName: 'Sasha Al-Amin', grade: 'Reception', campus: 'Nairobi Kindergarten', parentName: 'Mariam Al-Amin', phone: '+254 722 345 678', date: '2026-06-08', status: 'new' },
  { id: '3', studentName: 'Michael Ochieng', grade: 'Year 7', campus: 'Mombasa Campus', parentName: 'Robert Ochieng', phone: '+254 733 987 654', date: '2026-06-05', status: 'review' },
  { id: '4', studentName: 'Amani Mutua', grade: 'Grade 5', campus: 'Nairobi Lavington', parentName: 'David Mutua', phone: '+254 701 445 566', date: '2026-06-01', status: 'assessment' },
  { id: '5', studentName: 'Zahra Omar', grade: 'Year 12', campus: 'Malindi Campus', parentName: 'Omar Hassan', phone: '+254 715 889 900', date: '2026-05-28', status: 'offer' },
  { id: '6', studentName: 'Liam Davis', grade: 'Playgroup', campus: 'Nairobi Karen', parentName: 'Emily Davis', phone: '+254 725 112 233', date: '2026-05-20', status: 'enrolled' },
]

const STAGES = [
  { id: 'new', label: 'New Inquiry', color: 'border-t-blue-500 text-blue-600 bg-blue-500/5' },
  { id: 'review', label: 'In Review', color: 'border-t-amber-500 text-amber-600 bg-amber-500/5' },
  { id: 'assessment', label: 'Assessment Scheduled', color: 'border-t-purple-500 text-purple-600 bg-purple-500/5' },
  { id: 'offer', label: 'Offer Extended', color: 'border-t-indigo-500 text-indigo-600 bg-indigo-500/5' },
  { id: 'enrolled', label: 'Enrolled / Closed', color: 'border-t-emerald-500 text-emerald-600 bg-emerald-500/5' },
]

export default function KanbanPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES)
  const [searchTerm, setSearchTerm] = useState('')
  const [campusFilter, setCampusFilter] = useState('all')
  const [isAdding, setIsAdding] = useState(false)

  // New Inquiry form fields
  const [newStudent, setNewStudent] = useState('')
  const [newGrade, setNewGrade] = useState('Year 10')
  const [newCampus, setNewCampus] = useState('Nairobi Karen')
  const [newParent, setNewParent] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleAddNewInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStudent.trim() || !newParent.trim()) return

    const newlyCreated: Inquiry = {
      id: Math.random().toString(),
      studentName: newStudent,
      grade: newGrade,
      campus: newCampus,
      parentName: newParent,
      phone: newPhone,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    }

    setInquiries([...inquiries, newlyCreated])
    setIsAdding(false)
    setNewStudent('')
    setNewParent('')
    setNewPhone('')
  }

  // Move card to next or selected stage
  const handleMoveStage = (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    )
  }

  // Filters and search logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampus = campusFilter === 'all' || inq.campus === campusFilter
    return matchesSearch && matchesCampus
  })

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden flex flex-col bg-muted/10">
          {/* Top toolbar header */}
          <header className="h-16 shrink-0 bg-card border-b border-border px-8 flex items-center justify-between z-10 shadow-sm">
            <div>
              <h1 className="text-sm font-bold flex items-center gap-2">
                <Columns className="size-4 text-blue-600" />
                Admissions inquiry Kanban Tracker
              </h1>
              <p className="text-[10px] text-muted-foreground">Manage leads, scheduling assessments, and tracking student enrolments</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsAdding(true)} size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Plus className="size-3.5 mr-1" /> Add Inquiry Lead
              </Button>
            </div>
          </header>

          {/* Sub bar: Search and Filter options */}
          <div className="bg-card border-b px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 z-10">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  aria-label="Search students or parents"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search students or parents..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border bg-background text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Filter className="size-3.5" /> Filter Campus:
              </span>
              <select
                aria-label="Filter Campus"
                className="rounded-lg border bg-background text-xs px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={campusFilter}
                onChange={(e) => setCampusFilter(e.target.value)}
              >
                <option value="all">All Campuses</option>
                <option value="Nairobi Karen">Nairobi Karen</option>
                <option value="Nairobi Lavington">Nairobi Lavington</option>
                <option value="Nairobi Kindergarten">Nairobi Kindergarten</option>
                <option value="Mombasa Campus">Mombasa Campus</option>
                <option value="Malindi Campus">Malindi Campus</option>
              </select>
            </div>
          </div>

          {/* Main Kanban Board Layout Area */}
          <div className="flex-1 overflow-x-auto p-8 flex items-stretch gap-5">
            {STAGES.map((stage) => {
              const stageCards = filteredInquiries.filter((inq) => inq.status === stage.id)
              return (
                <div key={stage.id} className="w-80 shrink-0 bg-card/40 rounded-xl border border-border flex flex-col overflow-hidden">
                  
                  {/* Column Header */}
                  <div className={`p-4 border-t-4 ${stage.color} border-b flex items-center justify-between`}>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">{stage.label}</h3>
                    <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{stageCards.length}</span>
                  </div>

                  {/* Cards container */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
                    {stageCards.length > 0 ? (
                      stageCards.map((card) => (
                        <div key={card.id} className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all space-y-3 relative group">
                          
                          {/* Student Details */}
                          <div>
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{card.date}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                {card.grade}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-foreground mt-1.5 flex items-center gap-1.5">
                              <User className="size-3.5 text-blue-600" />
                              {card.studentName}
                            </h4>
                          </div>

                          {/* Meta Icons information */}
                          <div className="space-y-1.5 text-[11px] text-muted-foreground border-t pt-2.5">
                            <p className="flex items-center gap-1.5">
                              <MapPin className="size-3 text-blue-600" />
                              {card.campus}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <GraduationCap className="size-3 text-blue-600" />
                              Parent: {card.parentName}
                            </p>
                            <p className="font-mono text-[10px]">{card.phone}</p>
                          </div>

                          {/* Stage Transition Selector Action buttons */}
                          <div className="border-t pt-2 mt-2 flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                              <ArrowLeftRight className="size-3" /> Move:
                            </span>
                            <select
                              aria-label="Transition Stage"
                              className="text-[10px] font-semibold border rounded bg-background px-1 py-0.5"
                              value={card.status}
                              onChange={(e) => handleMoveStage(card.id, e.target.value as Inquiry['status'])}
                            >
                              <option value="new">New Inquiry</option>
                              <option value="review">In Review</option>
                              <option value="assessment">Assessment</option>
                              <option value="offer">Offer Extended</option>
                              <option value="enrolled">Enrolled</option>
                            </select>
                          </div>

                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl flex flex-col items-center justify-center p-4">
                        <AlertCircle className="size-7 text-muted-foreground/30 mb-2" />
                        <p className="text-[10px]">No inquiries in this stage</p>
                      </div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>

          {/* Modal Overlay: Add inquiry lead */}
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <Card className="w-full max-w-md shadow-2xl border border-border">
                <CardHeader>
                  <CardTitle>Add Inquiry Lead</CardTitle>
                  <CardDescription>Manually log a walk-in or telephone admissions inquiry lead</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <form onSubmit={handleAddNewInquiry} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modalStudentName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student Name *</label>
                      <input
                        id="modalStudentName"
                        required
                        placeholder="Liam Kimani"
                        className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none"
                        value={newStudent}
                        onChange={(e) => setNewStudent(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="modalGrade" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade/Level</label>
                        <select
                          id="modalGrade"
                          aria-label="Grade / Level"
                          className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none"
                          value={newGrade}
                          onChange={(e) => setNewGrade(e.target.value)}
                        >
                          <option value="Playgroup">Playgroup</option>
                          <option value="Reception">Reception</option>
                          <option value="Primary Year 3">Primary Year 3</option>
                          <option value="Year 7">Year 7</option>
                          <option value="Year 10">Year 10</option>
                          <option value="Year 12">Year 12</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label htmlFor="modalCampus" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campus</label>
                        <select
                          id="modalCampus"
                          aria-label="Campus"
                          className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none"
                          value={newCampus}
                          onChange={(e) => setNewCampus(e.target.value)}
                        >
                          <option value="Nairobi Karen">Nairobi Karen</option>
                          <option value="Nairobi Lavington">Nairobi Lavington</option>
                          <option value="Nairobi Kindergarten">Nairobi Kindergarten</option>
                          <option value="Mombasa Campus">Mombasa Campus</option>
                          <option value="Malindi Campus">Malindi Campus</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modalParentName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parent Full Name *</label>
                      <input
                        id="modalParentName"
                        required
                        placeholder="e.g. Sarah Kimani"
                        className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none"
                        value={newParent}
                        onChange={(e) => setNewParent(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modalParentPhone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parent Phone *</label>
                      <input
                        id="modalParentPhone"
                        required
                        placeholder="+254 712 345678"
                        className="w-full rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                      <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Log Lead Inquiry</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  )
}
