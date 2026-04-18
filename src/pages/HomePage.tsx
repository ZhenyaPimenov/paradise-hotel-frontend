import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Paradise Hotel</p>
            <h1>Find your next coastal escape with a modern booking experience.</h1>
            <p className="hero-text">
              Browse hotel locations, search real availability, create reservations online and manage bookings with a smooth, responsive interface.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/search">Search rooms</Link>
              <Link className="button button-outline" to="/about">Learn more</Link>
            </div>
          </div>
          <div className="panel hero-card">
            <h3>What this project includes</h3>
            <ul>
              <li>Authentication and protected routes</li>
              <li>Availability search with filters</li>
              <li>User reservations area</li>
              <li>Admin dashboard with charts</li>
              <li>Admin locations management</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section-grid">
        <div className="panel">
          <h3>Guest experience</h3>
          <p>Visitors can search for rooms, compare hotel details and book available stays for selected dates.</p>
        </div>
        <div className="panel">
          <h3>User account area</h3>
          <p>Authenticated users can review active and cancelled reservations in one clear page.</p>
        </div>
        <div className="panel">
          <h3>Administration tools</h3>
          <p>Administrators can view business metrics, inspect reservations and manage hotel locations.</p>
        </div>
      </section>
    </>
  );
}
