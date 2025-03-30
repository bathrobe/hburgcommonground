import React from 'react'
import Calendar from '../components/calendar'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const metadata = {
  title: 'Events | My Site',
  description: 'Upcoming events and gatherings',
}

const EventsPage = async () => {
  const payload = await getPayload({ config })
  const events = await payload.find({ collection: 'events' })
  const { docs } = events
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <Calendar events={docs as any[]} />
    </div>
  )
}

export default EventsPage
