import Link from 'next/link';

interface VendorCardProps {
  id: string;
  name: string;
  summary: string;
  logo?: string;
}

export default function VendorCard({ id, name, summary, logo }: VendorCardProps) {
  return (
    <Link
      href={`/vendors/${id}`}
      className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all"
    >
      {logo && (
        <div className="mb-4 flex items-center justify-center h-20 bg-slate-50 rounded">
          <img src={logo} alt={`${name} logo`} className="max-h-full max-w-full object-contain" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{name}</h3>
      <p className="text-slate-600 text-sm">{summary}</p>
    </Link>
  );
}