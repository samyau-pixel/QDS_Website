import Link from 'next/link';

interface OfferingItemProps {
  id: string;
  name: string;
  summary: string;
}

export default function OfferingList({ offerings }: { offerings: OfferingItemProps[] }) {
  if (offerings.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">Related Offerings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offerings.map((offering) => (
          <Link
            key={offering.id}
            href={`/offerings/${offering.id}`}
            className="block p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
          >
            <h4 className="font-medium text-slate-900 mb-1">{offering.name}</h4>
            <p className="text-slate-600 text-sm">{offering.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
