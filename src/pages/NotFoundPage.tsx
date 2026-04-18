import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="container page-section narrow">
      <div className="panel centered">
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="button" to="/">Back to home</Link>
      </div>
    </section>
  );
}
