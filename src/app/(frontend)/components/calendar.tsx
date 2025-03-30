'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-mobile'

// Types for our calendar
interface CalendarEvent {
  id: string
  title: string
  date: Date
  description: string
  location?: string
  color?: string
}

// Sample events data
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 2, 15, 10, 0),
    description: 'Weekly team sync to discuss project progress and blockers.',
    location: 'Conference Room A',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Lunch with Client',
    date: new Date(2025, 2, 18, 12, 30),
    description: 'Discuss new project requirements over lunch.',
    location: 'Downtown Bistro',
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Product Demo',
    date: new Date(2025, 2, 22, 14, 0),
    description: 'Present the new features to the stakeholders.',
    location: 'Main Auditorium',
    color: 'bg-purple-500',
  },
  {
    id: '4',
    title: 'Interview',
    date: new Date(2025, 2, 22, 11, 0),
    description: 'Interview candidate for the developer position.',
    location: 'Meeting Room B',
    color: 'bg-yellow-500',
  },
  {
    id: '5',
    title: 'Project Deadline',
    date: new Date(2025, 2, 28, 17, 0),
    description: 'Final submission of the project deliverables.',
    location: 'Online',
    color: 'bg-red-500',
  },
  {
    id: '6',
    title: 'Training Session',
    date: new Date(2025, 2, 10, 9, 0),
    description: 'New tool training for the development team.',
    location: 'Training Room',
    color: 'bg-indigo-500',
  },
  {
    id: '7',
    title: 'Code Review',
    date: new Date(2025, 2, 15, 14, 0),
    description: 'Review pull requests and discuss code quality.',
    location: 'Online',
    color: 'bg-blue-500',
  },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  // Format time to display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return sampleEvents.filter((event) => {
      const eventDate = event.date
      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getDate() === day
      )
    })
  }

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setOpen(true)
  }

  // Generate calendar grid
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-16 md:h-32 border border-border bg-muted/20" />,
      )
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const eventsForDay = getEventsForDay(day)
      days.push(
        <div key={day} className="h-16 md:h-32 border border-border p-1 overflow-hidden relative">
          <div className="font-medium text-sm mb-1 sticky top-0 bg-background z-10">{day}</div>
          <div className="space-y-1 overflow-y-auto max-h-[calc(100%-1.5rem)]">
            {eventsForDay.length > 0 && isMobile ? (
              <div
                className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => {
                  // Show a list of events for this day on mobile
                  const date = new Date(currentYear, currentMonth, day)
                  const formattedDate = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })

                  // Create a special "day view" event
                  const dayViewEvent: CalendarEvent = {
                    id: 'day-view',
                    title: `Events on ${formattedDate}`,
                    date: date,
                    description: `${eventsForDay.length} events scheduled`,
                    dayEvents: eventsForDay,
                  } as CalendarEvent & { dayEvents: CalendarEvent[] }

                  handleEventClick(dayViewEvent)
                }}
              >
                {eventsForDay.length}
              </div>
            ) : (
              eventsForDay.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className={cn(
                    'text-xs p-1 rounded cursor-pointer text-white truncate',
                    event.color || 'bg-blue-500',
                  )}
                >
                  {event.title}
                </div>
              ))
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  // Render event details
  const renderEventDetails = () => {
    if (!selectedEvent) return null

    // Check if this is a day view (multiple events)
    const isDayView = 'dayEvents' in selectedEvent

    if (isDayView) {
      const dayEvents = (selectedEvent as unknown as { dayEvents: CalendarEvent[] }).dayEvents

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{selectedEvent.title}</h3>
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 border rounded-md cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">{formatTime(event.date)}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {selectedEvent.location && (
          <div>
            <h4 className="font-medium text-sm">Location</h4>
            <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
          </div>
        )}
        <div>
          <h4 className="font-medium text-sm">Description</h4>
          <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="container mx-auto p-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{formatDate(currentDate)}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar header - days of week (abbreviated for mobile) */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Su', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day) => (
            <div key={day} className="text-center font-semibold py-2 bg-muted/50 text-xs">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>

        {/* Event details drawer for mobile */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{selectedEvent?.title}</DrawerTitle>
              <DrawerDescription>
                {selectedEvent?.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                {selectedEvent &&
                  !('dayEvents' in selectedEvent) &&
                  `at ${formatTime(selectedEvent.date)}`}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-8">{renderEventDetails()}</div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{formatDate(currentDate)}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar header - days of week */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold py-2 bg-muted/50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>

      {/* Event details modal for desktop */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              {selectedEvent &&
                !('dayEvents' in selectedEvent) &&
                `at ${formatTime(selectedEvent.date)}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">{renderEventDetails()}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
