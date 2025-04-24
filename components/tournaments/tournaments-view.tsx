import { Button } from "@/components/ui/button"
import { TournamentGrid } from "@/components/tournaments/tournament-grid"
import { PlusCircle } from "lucide-react"
import { CreateTournamentDialog } from "@/components/tournaments/create-tournament-dialog"

export function TournamentsView() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tournaments</h1>
        <CreateTournamentDialog>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Tournament
          </Button>
        </CreateTournamentDialog>
      </div>

      <TournamentGrid />
    </div>
  )
}
