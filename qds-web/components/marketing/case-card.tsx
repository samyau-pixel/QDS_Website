import Link from 'next/link';

interface Props {
  slug: string;
  name: string;
  company: string;
  summary: string;
}

export default function CaseCard({ slug, name, company, summary }: Props) {
  return (
    <Link
      href={`/cases/${slug}`}
      className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{name}</h3>
      <p className="text-sm text-slate-500 mb-2">{company}</p>
      <p className="text-slate-600">{summary}</p>
    </Link>
  );
}
