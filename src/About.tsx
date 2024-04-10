export default function About() {
  const buildDate = "__DATE__";
  return (
    <section className="mt-auto">
      <span className="text-xs">build: {buildDate}</span>
    </section>
  );
}
