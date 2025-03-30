import React from 'react'

export const metadata = {
  title: 'Events | My Site',
  description: 'Upcoming events and gatherings',
}

const EventsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <p className="text-gray-600">Check back soon for upcoming events.</p>
    </div>
  )
}

export default EventsPage
