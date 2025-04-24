import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
const pouleMatches = [
  {
    id: 1,
    date: "Apr 28, 2024",
    teamA: { name: "Arsenal", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Chelsea", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    venue: "Emirates Stadium",
  },
  {
    id: 2,
    date: "May 1, 2024",
    teamA: { name: "Liverpool", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Man City", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    venue: "Anfield",
  },
  {
    id: 3,
    date: "May 5, 2024",
    teamA: { name: "Tottenham", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Man United", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    venue: "Tottenham Hotspur Stadium",
  },
  {
    id: 4,
    date: "May 8, 2024",
    teamA: { name: "Newcastle", logo: "/placeholder.svg?height=24&width=24" },
    teamB: { name: "Aston Villa", logo: "/placeholder.svg?height=24&width=24" },
    score: null,
    venue: "St. James' Park",
  },
]

export function TournamentBracket({ type }: { type: string }) {
  if (type === "mixed") {
    return (
      <Tabs defaultValue="poules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="poules">Poules Phase</TabsTrigger>
          <TabsTrigger value="knockout">Knockout Phase</TabsTrigger>
        </TabsList>
        <TabsContent value="poules">
          <PouleTable matches={pouleMatches} />
        </TabsContent>
        <TabsContent value="knockout">
          <KnockoutBracket />
        </TabsContent>
      </Tabs>
    )
  }

  if (type === "knockout") {
    return <KnockoutBracket />
  }

  // Default to poules
  return <PouleTable matches={pouleMatches} />
}

function PouleTable({ matches }: { matches: any[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Team A</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Team B</TableHead>
            <TableHead>Venue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={match.teamA.logo || "/placeholder.svg"}
                    alt={match.teamA.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{match.teamA.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center font-semibold">
                {match.score ? `${match.score.teamA} - ${match.score.teamB}` : "vs"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={match.teamB.logo || "/placeholder.svg"}
                    alt={match.teamB.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{match.teamB.name}</span>
                </div>
              </TableCell>
              <TableCell>{match.venue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function KnockoutBracket() {
  return (
    <div className="p-4 border rounded-md bg-muted/30 min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-lg font-medium">Tournament Bracket</div>
        <div className="text-sm text-muted-foreground">
          The knockout phase will be displayed here once the poule phase is completed.
        </div>
      </div>
    </div>
  )
}
