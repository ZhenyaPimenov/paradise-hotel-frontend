export function SectionIntro({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
