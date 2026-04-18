export function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="state-card" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
