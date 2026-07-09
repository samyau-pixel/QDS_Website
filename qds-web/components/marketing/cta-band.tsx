export default function CtaBand({
  cta,
}: {
  cta: { label: string; href: string; style: string };
}) {
  return (
    <section className="py-12 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <a
          href={cta.href}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          {cta.label}
        </a>
      </div>
    </section>
  );
}
