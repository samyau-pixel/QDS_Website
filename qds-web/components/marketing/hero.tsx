export default function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string; style: string; onClick?: () => void };
  secondaryCta?: { label: string; href: string; style: string; onClick?: () => void };
}) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{headline}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryCta.href}
            onClick={primaryCta.onClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              onClick={secondaryCta.onClick}
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
