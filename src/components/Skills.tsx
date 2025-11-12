const SKILLS = [
  { name: "HTML5", emoji: "🔖" },
  { name: "CSS3", emoji: "🎨" },
  { name: "JavaScript", emoji: "⚡" },
  { name: "React", emoji: "⚛️" },
  { name: "Tailwind CSS", emoji: "🌬️" },
  { name: "TypeScript", emoji: "🔐" },
  { name: "Git", emoji: "🔧" },
  { name: "Figma", emoji: "🖌️" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 bg-[color:var(--btn-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-[color:var(--color-accent)] mb-6">Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <div
              key={s.name}
              className="p-4 rounded-lg flex items-center gap-3 border border-gray-700 hover:border-[color:var(--color-accent)] transition"
            >
              <div className="text-2xl">{s.emoji}</div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-400">Intermediate</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
