import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Query the faq collection to get all items
    const { docs } = await payload.find({
      collection: 'faq',
      limit: 100,
    })

    // Return the faq pages in the response
    return NextResponse.json({ docs })
  } catch (error) {
    console.error('Error fetching FAQ pages:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQ pages' }, { status: 500 })
  }
}
