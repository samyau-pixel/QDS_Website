import SolutionCard from './solution-card';
import type { SolutionCardViewModel } from '@/lib/content/fs-content';

interface OfferingListProps {
  offerings: Array<{ id: string; name: string; summary: string }>;
  solutionCards?: SolutionCardViewModel[];
}

export default function OfferingList({ offerings, solutionCards }: OfferingListProps) {
  if (offerings.length === 0 && (!solutionCards || solutionCards.length === 0)) return null;

  // If solution cards are provided, render them
  if (solutionCards && solutionCards.length > 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Related Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutionCards.map((card) => (
            <SolutionCard key={card.id} viewModel={card} />
          ))}
        </div>
      </div>
    );
  }

  // Fallback to simple offering list
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">Related Offerings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offerings.map((offering) => (
          <div
            key={offering.id}
            className="block p-4 bg-slate-50 border border-slate-200 rounded-lg"
          >
            <h4 className="font-medium text-slate-900 mb-1">{offering.name}</h4>
            <p className="text-slate-600 text-sm">{offering.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
