import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { MatchesTable } from "@/components/dashboard/matches-table"
import { TournamentProgress } from "@/components/dashboard/tournament-progress"

export function DashboardView() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Today: {new Date().toLocaleDateString()}</div>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MatchesTable />
        </div>
        <div>
          <TournamentProgress />
        </div>
      </div>
    </div>
  )
}
