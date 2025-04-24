"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, ChevronDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const matches = [
  {
    id: 1,
    time: "10:00",
    status: "Scheduled",
    teamA: { name: "Cloud9", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Team Liquid", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    tournament: "LCS Summer",
  },
  {
    id: 2,
    time: "12:30",
    status: "Live",
    teamA: { name: "Fnatic", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "G2 Esports", logo: "/placeholder.svg?height=24&width=24" },
    score: { teamA: 2, teamB: 1 },
    tournament: "LEC Summer",
  },
  {
    id: 3,
    time: "15:00",
    status: "Scheduled",
    teamA: { name: "T1", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Gen.G", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    tournament: "LCK Summer",
  },
  {
    id: 4,
    time: "09:00",
    status: "Finished",
    teamA: { name: "FaZe Clan", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Natus Vincere", logo: "/placeholder.svg?height=24&width=24" },
    score: { teamA: 3, teamB: 2 },
    tournament: "ESL Pro League",
  },
  {
    id: 5,
    time: "18:45",
    status: "Scheduled",
    teamA: { name: "Team Secret", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "OG", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    tournament: "The International",
  },
]

export function MatchesTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Live":
        return <Badge className="bg-red-500 animate-pulse-glow">Live</Badge>
      case "Finished":
        return <Badge className="bg-green-500">Finished</Badge>
      default:
        return (
          <Badge variant="outline" className="border-primary/50">
            Scheduled
          </Badge>
        )
    }
  }

  return (
    <Card className="border border-border/30 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-esports-gradient">
          Today's Matches
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full md:w-[200px] pl-8 bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-primary/20">
              <DropdownMenuCheckboxItem checked>Scheduled</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Live</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Finished</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-primary/20 hover:border-primary/50 transition-all duration-300"
          >
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Date picker</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow className="border-b border-border/30 hover:bg-primary/5">
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Team A</TableHead>
              <TableHead className="w-[80px] text-center">Score</TableHead>
              <TableHead>Team B</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Tournament
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow
                key={match.id}
                className="border-b border-border/20 hover:bg-primary/5 transition-colors duration-200"
              >
                <TableCell className="font-medium">{match.time}</TableCell>
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
                <TableCell>{match.tournament}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 border-primary/20"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
