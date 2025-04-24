import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const tournaments = [
  { id: 1, name: "LCS Summer", progress: 65, color: "#7C3AED" },
  { id: 2, name: "LEC Summer", progress: 42, color: "#3B82F6" },
  { id: 3, name: "LCK Summer", progress: 78, color: "#10B981" },
  { id: 4, name: "ESL Pro League", progress: 51, color: "#F59E0B" },
  { id: 5, name: "The International", progress: 37, color: "#EF4444" },
]

export function TournamentProgress() {
  return (
    <Card className="border border-border/30 bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-esports-gradient">
          Tournament Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="space-y-1 group">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                {tournament.name}
              </span>
              <span className="text-sm text-muted-foreground">{tournament.progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-500 ease-out animate-pulse-glow"
                style={{
                  width: `${tournament.progress}%`,
                  background: `linear-gradient(90deg, ${tournament.color}80, ${tournament.color})`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
