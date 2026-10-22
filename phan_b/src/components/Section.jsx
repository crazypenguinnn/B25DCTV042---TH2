export default function Section({ title, children, className = "" }) {
  return (
    <section className={`content-section ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-body">
        {children}
      </div>
    </section>
  );
}