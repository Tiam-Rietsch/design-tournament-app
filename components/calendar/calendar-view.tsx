"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample data
const events = [
  {
    id: 1,
    date: new Date(2024, 3, 28), // April 28, 2024
    teamA: { name: "Cloud9", logo: "/placeholder.svg?height=24&width=24", color: "#1DA1F2" },
    teamB: { name: "Team Liquid", logo: "/placeholder.svg?height=24&width=24", color: "#0A1128" },
    time: "15:00",
    endTime: "17:00",
    tournament: "LCS Summer",
  },
  {
    id: 2,
    date: new Date(2024, 4, 1), // May 1, 2024
    teamA: { name: "Fnatic", logo: "/placeholder.svg?height=24&width=24", color: "#F39C12" },
    teamB: { name: "G2 Esports", logo: "/placeholder.svg?height=24&width=24", color: "#E74C3C" },
    time: "19:45",
    endTime: "21:45",
    tournament: "LEC Summer",
  },
  {
    id: 3,
    date: new Date(2024, 3, 30), // April 30, 2024
    teamA: { name: "T1", logo: "/placeholder.svg?height=24&width=24", color: "#E74C3C" },
    teamB: { name: "Gen.G", logo: "/placeholder.svg?height=24&width=24", color: "#F1C40F" },
    time: "20:00",
    endTime: "22:00",
    tournament: "LCK Summer",
  },
  {
    id: 4,
    date: new Date(2024, 3, 29), // April 29, 2024
    teamA: { name: "FaZe Clan", logo: "/placeholder.svg?height=24&width=24", color: "#E74C3C" },
    teamB: { name: "Natus Vincere", logo: "/placeholder.svg?height=24&width=24", color: "#F1C40F" },
    time: "20:00",
    endTime: "22:00",
    tournament: "ESL Pro League",
  },
  {
    id: 5,
    date: new Date(2024, 3, 28), // April 28, 2024
    teamA: { name: "Team Secret", logo: "/placeholder.svg?height=24&width=24", color: "#8E44AD" },
    teamB: { name: "OG", logo: "/placeholder.svg?height=24&width=24", color: "#27AE60" },
    time: "18:30",
    endTime: "20:30",
    tournament: "The International",
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Calculate the number of days to display from the previous month
  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Calculate the start date for the calendar grid (might be in the previous month)
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - daysFromPrevMonth)

  // Generate an array of dates for the calendar grid (42 days = 6 weeks)
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    return date
  })

  // Format month and year for display
  const monthYearDisplay = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  // Generate time slots for day/week view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return `${i.toString().padStart(2, "0")}:00`
  })

  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 bg-white px-4 py-3 rounded-md shadow-sm border border-border/30">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-esports-gradient">
            {monthYearDisplay}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="border-primary/20 hover:border-primary/50 transition-all duration-300"
          >
            Today
          </Button>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select value={view} onValueChange={(value: "month" | "week" | "day") => setView(value)}>
            <SelectTrigger className="w-[100px] border-primary/20 hover:border-primary/50 transition-all duration-300">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="gap-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300"
          >
            <Plus className="h-4 w-4" />
            Add Match
          </Button>
        </div>
      </div>

      {view === "month" && (
        <div className="flex-1 flex flex-col border border-border/30 rounded-md overflow-hidden bg-white shadow-sm">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-border/30">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 flex-1" style={{ gridTemplateRows: "repeat(6, 1fr)" }}>
            {calendarDays.map((date, index) => {
              const dateEvents = getEventsForDate(date)
              const isCurrentMonthDay = isCurrentMonth(date)

              return (
                <div
                  key={index}
                  className={`border-b border-r border-border/20 min-h-[100px] p-1 transition-colors duration-200 ${
                    isCurrentMonthDay ? "bg-card/40" : "bg-muted/10"
                  } ${isToday(date) ? "bg-primary/5" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`h-6 w-6 flex items-center justify-center rounded-full text-xs ${
                        isToday(date)
                          ? "bg-primary text-primary-foreground font-bold animate-pulse-glow"
                          : isCurrentMonthDay
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    {dateEvents.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 hover:bg-primary/10 transition-colors duration-200"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card/80 backdrop-blur-md border-primary/20">
                          <DropdownMenuItem>Add Match</DropdownMenuItem>
                          <DropdownMenuItem>View All ({dateEvents.length})</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {/* Events */}
                  <div className="mt-1 space-y-1 max-h-[calc(100%-24px)] overflow-y-auto">
                    {dateEvents.map((event) => (
                      <Link href="#" key={event.id}>
                        <Card
                          className="p-1 text-xs cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                          style={{
                            borderLeft: `3px solid ${event.teamA.color}`,
                            background: `linear-gradient(to right, ${event.teamA.color}10, ${event.teamB.color}10)`,
                          }}
                        >
                          <div className="font-medium truncate">
                            {event.time} {event.tournament}
                          </div>
                          <div className="flex items-center justify-between gap-1 truncate">
                            <div className="flex items-center gap-1 truncate">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: event.teamA.color }} />
                              <span className="truncate">{event.teamA.name}</span>
                            </div>
                            <span className="text-primary font-bold">vs</span>
                            <div className="flex items-center gap-1 truncate">
                              <span className="truncate">{event.teamB.name}</span>
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: event.teamB.color }} />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="flex-1 flex flex-col border border-border/30 rounded-md overflow-hidden bg-card/60 backdrop-blur-sm">
          {/* Weekday Headers */}
          <div className="grid grid-cols-8 border-b border-border/30">
            <div className="p-2 text-center text-sm font-medium text-muted-foreground border-r border-border/30">
              Time
            </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Week View */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-8" style={{ gridTemplateRows: "repeat(24, 60px)" }}>
              {timeSlots.map((time, index) => (
                <React.Fragment key={time}>
                  <div className="border-r border-b border-border/20 p-1 text-xs text-muted-foreground">{time}</div>
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <div
                      key={day}
                      className="border-b border-r border-border/20 p-1 relative hover:bg-primary/5 transition-colors duration-200"
                    >
                      {/* We would render events here based on their time */}
                      {events
                        .filter((event) => {
                          const eventHour = Number.parseInt(event.time.split(":")[0])
                          return eventHour === index
                        })
                        .map((event) => (
                          <Card
                            key={event.id}
                            className="absolute inset-x-1 p-1 text-xs cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                            style={{
                              top: "0",
                              height: "55px",
                              borderLeft: `3px solid ${event.teamA.color}`,
                              background: `linear-gradient(to right, ${event.teamA.color}10, ${event.teamB.color}10)`,
                            }}
                          >
                            <div className="font-medium truncate">
                              {event.time} {event.tournament}
                            </div>
                            <div className="flex items-center justify-between gap-1 truncate">
                              <span className="truncate">{event.teamA.name}</span>
                              <span className="text-primary font-bold">vs</span>
                              <span className="truncate">{event.teamB.name}</span>
                            </div>
                          </Card>
                        ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="flex-1 flex flex-col border border-border/30 rounded-md overflow-hidden bg-card/60 backdrop-blur-sm">
          {/* Day Header */}
          <div className="p-2 text-center text-sm font-medium border-b border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          {/* Day View */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1" style={{ gridTemplateRows: "repeat(24, 60px)" }}>
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="border-b border-border/20 p-1 flex hover:bg-primary/5 transition-colors duration-200"
                >
                  <div className="w-16 text-xs text-muted-foreground">{time}</div>
                  <div className="flex-1 relative">
                    {/* We would render events here based on their time */}
                    {events
                      .filter((event) => {
                        const eventDate = event.date
                        const eventHour = Number.parseInt(event.time.split(":")[0])
                        return (
                          eventDate.getDate() === currentDate.getDate() &&
                          eventDate.getMonth() === currentDate.getMonth() &&
                          eventDate.getFullYear() === currentDate.getFullYear() &&
                          eventHour === index
                        )
                      })
                      .map((event) => (
                        <Card
                          key={event.id}
                          className="absolute inset-x-1 p-2 cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                          style={{
                            top: "0",
                            height: "55px",
                            borderLeft: `3px solid ${event.teamA.color}`,
                            background: `linear-gradient(to right, ${event.teamA.color}10, ${event.teamB.color}10)`,
                          }}
                        >
                          <div className="font-medium">
                            {event.time} - {event.tournament}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <img
                                src={event.teamA.logo || "/placeholder.svg"}
                                alt={event.teamA.name}
                                className="h-4 w-4 rounded-full"
                              />
                              <span>{event.teamA.name}</span>
                            </div>
                            <span className="text-primary font-bold">vs</span>
                            <div className="flex items-center gap-1">
                              <span>{event.teamB.name}</span>
                              <img
                                src={event.teamB.logo || "/placeholder.svg"}
                                alt={event.teamB.name}
                                className="h-4 w-4 rounded-full"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
