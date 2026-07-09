import Link from 'next/link';

export default function FeaturedGrid({
  title,
  items,
  hrefPrefix,
}: {
  title: string;
  items: Array<{ id: string; name: string; summary: string }>;
  hrefPrefix: string;
}) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`${hrefPrefix}/${item.id}`}
              className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
              <p className="text-slate-600 text-sm">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
