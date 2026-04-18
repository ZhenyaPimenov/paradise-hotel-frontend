export function Alert({ tone = 'error', message }: { tone?: 'error' | 'success'; message: string }) {
  return <div className={`alert alert-${tone}`}>{message}</div>;
}
