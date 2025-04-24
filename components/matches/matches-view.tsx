import { MatchesAccordion } from "@/components/matches/matches-accordion"

export function MatchesView() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Matches</h1>
      </div>

      <MatchesAccordion />
    </div>
  )
}
