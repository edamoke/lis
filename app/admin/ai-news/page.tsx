'use client'

import React, { useState } from 'react'
import AdminGuard from '@/components/admin/admin-guard'
import AdminSidebar from '@/components/admin/admin-sidebar'
import { Sparkles, Send, Copy, Check, FileText, Mail, FileDown, Brain, HelpCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function AiNewsPage() {
  const [prompt, setPrompt] = useState('')
  const [contentType, setContentType] = useState('newsletter')
  const [tone, setTone] = useState('academic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<null | { subject: string; body: string; signoff: string }>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!generatedResult) return
    const fullText = `Subject: ${generatedResult.subject}\n\n${generatedResult.body}\n\n${generatedResult.signoff}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedResult(null)

    // Simulate smart AI generation preloaded with LIS patterns
    setTimeout(() => {
      let subject = 'Light International School - Updates'
      let body = ''
      let signoff = 'Warm regards,\nLight International School Administration'

      if (contentType === 'newsletter') {
        subject = 'LIS Academic Monthly Newsletter: Excellence, Innovation & Community'
        body = `Dear Parents, Students, and Friends,\n\nWe are delighted to share our monthly newsletter highlighting the vibrant projects and student successes across all five campuses. This month, our STEM and Robotics student innovators designed a prototype autonomous recycling bin, which was awarded first place in the national science showcase.\n\nAdditionally, we thank the Parent Teacher Association (PTA) for hosting a wonderful coffee morning on digital wellness last Thursday. Collaborative efforts like these continue to build a safe, inspiring environment for our students.\n\n**Important Dates Coming Up:**\n• June 18: PTA General Assembly ( Karen Campus & Zoom)\n• June 25: Parent Workshop on Holistic University Placement\n• July 03: Release of Academic Report Cards via Parent Portal.`
      } else if (contentType === 'email') {
        subject = 'Urgent: Invitation to PTA General Assembly - Light International School'
        body = `Dear Parents and Guardians,\n\nWe formally invite you to attend our PTA General Assembly on Thursday, June 18, 2026, starting at 5:30 PM. The assembly will be held physically in the Nairobi Karen Auditorium, with a live digital broadcast on Zoom for families who wish to join remotely.\n\nWe will discuss crucial academic plans for the 2026/2027 calendar year, review campus safety upgrades (including our new Lanyard tracking system), and elect sub-committee representatives.\n\nYour voice and active collaboration are vital to your child’s academic journey.`
      } else {
        subject = 'Social Media Post: Student Showcase ✨'
        body = `🚀 Innovation takes center stage at Light International School! 🌍\n\nOur brilliant high school student coders at Nairobi Karen designed an autonomous solar-powered recycling bin! From mechanical building to writing smart sensors software, these kids are proving that a Cambridge education at LIS truly unlocks academic success!\n\nJoin our community of confident, compassionate leaders today.`
        signoff = '#LightInternationalSchool #STEMKenya #CambridgeEducation #AccessToSuccess #Robotics'
      }

      setGeneratedResult({ subject, body, signoff })
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="px-8 py-8 max-w-5xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="size-6 text-blue-600 animate-pulse" />
                  AI Content & Newsletter Generator
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">Draft and write professional announcements, emails, or newsletters in seconds using LIS preloaded knowledge.</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              {/* Generator input config */}
              <div className="lg:col-span-5">
                <Card className="border border-border shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-600/5 to-red-500/5 border-b p-5">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Brain className="size-4 text-blue-600" />
                      Configure Generation
                    </CardTitle>
                    <CardDescription className="text-xs">Adjust your target parameters for the AI writer</CardDescription>
                  </CardHeader>

                  <CardContent className="p-5">
                    <form onSubmit={handleGenerate} className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="promptText" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What is this update about? *</label>
                        <textarea
                          id="promptText"
                          required
                          rows={4}
                          placeholder="e.g. Draft an announcement about the upcoming PTA coffee morning on digital wellness at Karen campus..."
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none resize-y"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="contentType" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Content Type</label>
                          <select
                            id="contentType"
                            aria-label="Content Type"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                          >
                            <option value="newsletter">Monthly Newsletter</option>
                            <option value="email">Email Broadcast</option>
                            <option value="social">Social Media Post</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="contentTone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tone & Voice</label>
                          <select
                            id="contentTone"
                            aria-label="Tone & Voice"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                          >
                            <option value="academic">Academic & Inspiring</option>
                            <option value="friendly">Warm & Welcoming</option>
                            <option value="formal">Formal & Administrative</option>
                          </select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-5 rounded-lg flex items-center justify-center gap-1.5 shadow-md mt-4"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="size-4 animate-spin" />
                            Synthesizing content...
                          </>
                        ) : (
                          <>
                            <Send className="size-3.5" />
                            Generate Content Draft
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>

                  <CardFooter className="bg-muted/10 border-t p-4 text-[10px] text-muted-foreground flex gap-2 items-start">
                    <HelpCircle className="size-4 text-blue-600 shrink-0" />
                    <span>Our AI model automatically matches Light International School brand voice guidelines, ensuring accurate campus spelling.</span>
                  </CardFooter>
                </Card>
              </div>

              {/* Generated result output */}
              <div className="lg:col-span-7">
                <Card className="border border-border shadow-md h-full flex flex-col">
                  <CardHeader className="border-b p-5 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                        <FileText className="size-4 text-blue-600" />
                        AI Output Draft
                      </CardTitle>
                      <CardDescription className="text-xs">Generated draft copy matching selected options</CardDescription>
                    </div>
                    {generatedResult && (
                      <Button onClick={handleCopy} size="sm" variant="outline" className="h-8 text-[11px] font-medium">
                        {copied ? (
                          <>
                            <Check className="size-3.5 text-emerald-600 mr-1" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5 mr-1" /> Copy Draft
                          </>
                        )}
                      </Button>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 p-6 bg-muted/10 flex flex-col justify-center">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                        <RefreshCw className="size-10 text-blue-600 animate-spin" />
                        <h3 className="font-semibold text-sm">Processing LIS Knowledge Base...</h3>
                        <p className="text-xs text-muted-foreground max-w-xs">Applying tone rules, matching student placement variables, and formatting sections.</p>
                      </div>
                    ) : generatedResult ? (
                      <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4 font-sans text-sm text-foreground flex-1">
                        <div>
                          <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Subject / Header Line:</span>
                          <p className="font-semibold text-sm border-b pb-2">{generatedResult.subject}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Body Text:</span>
                          <p className="text-xs leading-relaxed whitespace-pre-line text-muted-foreground">{generatedResult.body}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Sign-off / Hashtags:</span>
                          <p className="text-xs font-medium whitespace-pre-line text-blue-600 dark:text-blue-400">{generatedResult.signoff}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-24 text-muted-foreground">
                        <Brain className="size-12 text-blue-600/30 mx-auto mb-3" />
                        <p className="text-xs">No draft content generated yet.</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Configure parameters on the left and submit.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
