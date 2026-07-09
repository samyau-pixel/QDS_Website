export default function TrustSignals({
  signals,
}: {
  signals: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">{signal.value}</div>
              <div className="text-sm text-slate-600">{signal.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
