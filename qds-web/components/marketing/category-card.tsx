import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  summary: string;
}

export default function CategoryCard({ id, name, summary }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${id}`}
      className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{name}</h3>
      <p className="text-slate-600 text-sm">{summary}</p>
    </Link>
  );
}
