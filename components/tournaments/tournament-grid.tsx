import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample data
const tournaments = [
  {
    id: 1,
    name: "League of Legends World Championship",
    season: "2023-2024",
    progress: 65,
    nextMatch: "Apr 28, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#7C3AED",
  },
  {
    id: 2,
    name: "Valorant Champions Tour",
    season: "2023-2024",
    progress: 85,
    nextMatch: "Apr 30, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#3B82F6",
  },
  {
    id: 3,
    name: "Dota 2 The International",
    season: "2023-2024",
    progress: 90,
    nextMatch: "May 5, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#10B981",
  },
  {
    id: 4,
    name: "CS:GO Major Championship",
    season: "2023-2024",
    progress: 70,
    nextMatch: "Apr 29, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#F59E0B",
  },
  {
    id: 5,
    name: "Overwatch League",
    season: "2023-2024",
    progress: 75,
    nextMatch: "May 1, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#EF4444",
  },
  {
    id: 6,
    name: "Rocket League Championship Series",
    season: "2023-2024",
    progress: 68,
    nextMatch: "Apr 27, 2024",
    logo: "/placeholder.svg?height=64&width=64",
    color: "#EC4899",
  },
]

export function TournamentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <Card
          key={tournament.id}
          className="card-hover-effect overflow-hidden border border-border/30 bg-card/60 backdrop-blur-sm"
          style={{
            borderImage: `linear-gradient(to right, ${tournament.color}50, transparent) 1`,
            borderImageSlice: 1,
          }}
        >
          <CardHeader className="pb-2 relative">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ background: `linear-gradient(to right, ${tournament.color}, transparent)` }}
            />
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center bg-card p-1 border"
                  style={{ borderColor: `${tournament.color}50` }}
                >
                  <img
                    src={tournament.logo || "/placeholder.svg"}
                    alt={tournament.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{tournament.name}</h3>
                <p className="text-sm text-muted-foreground">Season: {tournament.season}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion</span>
                  <span>{tournament.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${tournament.progress}%`,
                      background: `linear-gradient(90deg, ${tournament.color}80, ${tournament.color})`,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Next match: {tournament.nextMatch}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <Link href={`/tournaments/${tournament.id}`}>View</Link>
            </Button>
            <Button
              size="sm"
              className="gap-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300"
              asChild
            >
              <Link href={`/tournaments/${tournament.id}`}>
                Manage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
