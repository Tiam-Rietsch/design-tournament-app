import { TournamentDetailsView } from "@/components/tournaments/tournament-details-view"

export default function TournamentDetailsPage({ params }: { params: { id: string } }) {
  return <TournamentDetailsView id={params.id} />
}
