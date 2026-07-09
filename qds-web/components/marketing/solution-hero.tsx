export default function SolutionHero({
  title,
  problemStatement,
}: {
  title: string;
  problemStatement: string;
}) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-xl max-w-3xl opacity-90">{problemStatement}</p>
      </div>
    </section>
  );
}
