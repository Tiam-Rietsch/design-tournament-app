"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TournamentBracket } from "@/components/tournaments/tournament-bracket"
import { TournamentSettings } from "@/components/tournaments/tournament-settings"
import { ArrowLeft, Calendar, Trophy } from "lucide-react"
import Link from "next/link"

// Sample data
const tournamentData = {
  id: "1",
  name: "Premier League",
  season: "2023-2024",
  type: "poules",
  nextMatch: {
    date: "Apr 28, 2024",
    time: "15:00",
    teamA: {
      name: "Arsenal",
      logo: "/placeholder.svg?height=80&width=80",
      color: "#EF0107",
    },
    teamB: {
      name: "Chelsea",
      logo: "/placeholder.svg?height=80&width=80",
      color: "#034694",
    },
  },
  seasons: [
    { year: "2023-2024", winner: null, status: "Active" },
    { year: "2022-2023", winner: "Manchester City", status: "Completed" },
    { year: "2021-2022", winner: "Manchester City", status: "Completed" },
    { year: "2020-2021", winner: "Manchester City", status: "Completed" },
  ],
}

export function TournamentDetailsView({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("view")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/tournaments">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{tournamentData.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span>Season: {tournamentData.season}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-6">
          {/* Hero section with next match */}
          <div
            className="relative rounded-lg overflow-hidden h-[40vh] flex items-center justify-center"
            style={{
              background: `linear-gradient(to right, ${tournamentData.nextMatch.teamA.color}33, ${tournamentData.nextMatch.teamB.color}33)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
              <div className="text-sm font-medium mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Next Match: {tournamentData.nextMatch.date} at {tournamentData.nextMatch.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 md:gap-16">
                <div className="flex flex-col items-center">
                  <img
                    src={tournamentData.nextMatch.teamA.logo || "/placeholder.svg"}
                    alt={tournamentData.nextMatch.teamA.name}
                    className="h-20 w-20 md:h-32 md:w-32"
                  />
                  <h3 className="mt-2 text-lg md:text-xl font-semibold">{tournamentData.nextMatch.teamA.name}</h3>
                </div>

                <div className="text-2xl md:text-4xl font-bold">VS</div>

                <div className="flex flex-col items-center">
                  <img
                    src={tournamentData.nextMatch.teamB.logo || "/placeholder.svg"}
                    alt={tournamentData.nextMatch.teamB.name}
                    className="h-20 w-20 md:h-32 md:w-32"
                  />
                  <h3 className="mt-2 text-lg md:text-xl font-semibold">{tournamentData.nextMatch.teamB.name}</h3>
                </div>
              </div>

              <Button className="mt-6">Start Match</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Seasons list */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">Seasons</h3>

              {tournamentData.seasons.map((season) => (
                <Card key={season.year} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{season.year}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            season.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {season.status}
                        </span>
                      </div>

                      {season.winner && <div className="text-sm text-muted-foreground">Winner: {season.winner}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tournament bracket or table */}
            <div className="md:col-span-3">
              <TournamentBracket type={tournamentData.type} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <TournamentSettings id={id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
