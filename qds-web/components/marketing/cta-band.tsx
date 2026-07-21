export default function CtaBand({
  headline,
  subheadline,
  cta,
}: {
  headline: string;
  subheadline?: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        {subheadline && (
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {subheadline}
          </p>
        )}
        <a
          href={cta.href}
          
          className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
        >
          {cta.label}
        </a>
      </div>
    </section>
  );
}
