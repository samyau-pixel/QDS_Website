interface SolutionOutcomesProps {
  outcomes: string[];
}

export default function SolutionOutcomes({ outcomes }: SolutionOutcomesProps) {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Expected Outcomes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <p className="text-slate-700">{outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
