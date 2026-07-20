export default function TrustSignals({
  signals,
}: {
  signals: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {signals.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">{signal.value}</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">{signal.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
