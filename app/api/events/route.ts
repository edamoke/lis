import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      )
    }

    // Seed some events if none exist
    if (!events || events.length === 0) {
      const defaultEvents = [
        {
          title: 'LIS STEM & Tech Expo',
          description: 'Explore the latest innovations in science, technology, engineering, and math.',
          city: 'Nairobi Karen',
          date: '05.02.2026',
          max_capacity: 150,
        },
        {
          title: 'Cambridge Academic Open Day',
          description: 'Learn about our world-class Cambridge International curriculum and pathways.',
          city: 'Nairobi Lavington',
          date: '12.02.2026',
          max_capacity: 200,
        },
        {
          title: 'Sports and Arts Festival',
          description: 'A celebration of athleticism, teamwork, and artistic expressions across campuses.',
          city: 'Mombasa Campus',
          date: '20.02.2026',
          max_capacity: 300,
        }
      ]

      const { data: seededEvents, error: seedError } = await supabase
        .from('events')
        .insert(defaultEvents)
        .select()

      if (!seedError && seededEvents) {
        return NextResponse.json({ data: seededEvents })
      }
    }

    return NextResponse.json({ data: events })
  } catch (error) {
    console.error('Events GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    const { title, description, city, date, max_capacity } = body

    if (!title || !city || !date) {
      return NextResponse.json(
        { error: 'Missing required fields (title, city, date)' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description: description || null,
          city,
          date,
          max_capacity: max_capacity ? parseInt(max_capacity) : null,
        }
      ])
      .select()

    if (error) {
      console.error('Error creating event:', error)
      return NextResponse.json(
        { error: 'Failed to create event' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Events POST API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
