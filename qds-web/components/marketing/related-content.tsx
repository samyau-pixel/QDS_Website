import Link from 'next/link';

interface RelatedContentProps {
  title: string;
  items: Array<{
    id: string;
    name: string;
    summary: string;
    type: 'partner' | 'category' | 'solution';
  }>;
}

export default function RelatedContent({ title, items }: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const href = `/${item.type}/${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className="block p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
            >
              <h4 className="font-medium text-slate-900 mb-1">{item.name}</h4>
              <p className="text-slate-600 text-sm">{item.summary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
