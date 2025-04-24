"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
const tournaments = [
  {
    id: 1,
    name: "Premier League",
    nextMatch: "Apr 28, 2024",
    progress: 65,
    matches: [
      {
        id: 1,
        date: "Apr 28, 2024",
        teamA: { name: "Arsenal", logo: "/placeholder.svg?height=24&width=24" },
        teamB: { name: "Chelsea", logo: "/placeholder.svg?height=24&width=24" },
        score: null,
        status: "Scheduled",
      },
      {
        id: 2,
        date: "May 1, 2024",
        teamA: { name: "Liverpool", logo: "/placeholder.svg?height=24&width=24" },
        teamB: { name: "Man City", logo: "/placeholder.svg?height=24&width=24" },
        score: null,
        status: "Scheduled",
      },
    ],
  },
  {
    id: 2,
    name: "Champions League",
    nextMatch: "Apr 30, 2024",
    progress: 85,
    matches: [
      {
        id: 3,
        date: "Apr 30, 2024",
        teamA: { name: "Barcelona", logo: "/placeholder.svg?height=24&width=24" },
        teamB: { name: "Bayern Munich", logo: "/placeholder.svg?height=24&width=24" },
        score: null,
        status: "Scheduled",
      },
      {
        id: 4,
        date: "May 3, 2024",
        teamA: { name: "Real Madrid", logo: "/placeholder.svg?height=24&width=24" },
        teamB: { name: "PSG", logo: "/placeholder.svg?height=24&width=24" },
        score: null,
        status: "Scheduled",
      },
    ],
  },
  {
    id: 3,
    name: "FA Cup",
    nextMatch: "May 5, 2024",
    progress: 90,
    matches: [
      {
        id: 5,
        date: "May 5, 2024",
        teamA: { name: "Man United", logo: "/placeholder.svg?height=24&width=24" },
        teamB: { name: "Tottenham", logo: "/placeholder.svg?height=24&width=24" },
        score: null,
        status: "Scheduled",
      },
    ],
  },
]

export function MatchesAccordion() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Live":
        return <Badge className="bg-red-500 animate-pulse">Live</Badge>
      case "Finished":
        return <Badge className="bg-green-500">Finished</Badge>
      default:
        return <Badge variant="outline">Scheduled</Badge>
    }
  }

  return (
    <Accordion type="multiple" defaultValue={["1"]} className="space-y-4">
      {tournaments.map((tournament) => (
        <AccordionItem
          key={tournament.id}
          value={tournament.id.toString()}
          className="border rounded-md bg-white shadow-sm"
        >
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{tournament.name}</span>
                <Badge variant="outline" className="ml-2">
                  {tournament.matches.length} matches
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>Next match: {tournament.nextMatch}</div>
                <div>Progress: {tournament.progress}%</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="rounded-md border shadow-sm bg-white">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team A</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead>Team B</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournament.matches.map((match) => (
                    <TableRow key={match.id} className="hover:bg-muted/10">
                      <TableCell className="font-medium">{match.date}</TableCell>
                      <TableCell>{getStatusBadge(match.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={match.teamA.logo || "/placeholder.svg"}
                            alt={match.teamA.name}
                            className="h-6 w-6 rounded-full bg-card p-0.5 border border-primary/20"
                          />
                          <span className="font-medium">{match.teamA.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {match.score ? (
                          <span className="text-primary">
                            {match.score.teamA} - {match.score.teamB}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">vs</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={match.teamB.logo || "/placeholder.svg"}
                            alt={match.teamB.name}
                            className="h-6 w-6 rounded-full bg-card p-0.5 border border-primary/20"
                          />
                          <span className="font-medium">{match.teamB.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
