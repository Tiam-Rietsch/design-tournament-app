import { CalendarDays, Flag, Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover-effect border border-primary/20 bg-card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Matches Today</CardTitle>
          <CalendarDays className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 compared to yesterday</p>
        </CardContent>
      </Card>

      <Card className="card-hover-effect border border-secondary/20 bg-card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ongoing Tournaments</CardTitle>
          <Trophy className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">3 finishing this month</p>
        </CardContent>
      </Card>

      <Card className="card-hover-effect border border-accent/20 bg-card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Goals Today</CardTitle>
          <Flag className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">Average 2.0 per match</p>
        </CardContent>
      </Card>

      <Card className="card-hover-effect border border-primary/20 bg-card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Popular Tournament</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">League of Legends</div>
          <p className="text-xs text-muted-foreground">5.2k viewers today</p>
        </CardContent>
      </Card>
    </div>
  )
}
