import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AppLayout() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-bar">
          <Link to="/" className="brand">Paradise Hotel</Link>
          <nav className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/search">Search Rooms</NavLink>
            {user && <NavLink to="/reservations">My Reservations</NavLink>}
            {isAdmin && <NavLink to="/admin/dashboard">Admin</NavLink>}
            {isAdmin && <NavLink to="/admin/locations">Locations</NavLink>}
{isAdmin && <NavLink to="/admin/reservations">Reservations</NavLink>}
          </nav>
          <div className="auth-actions">
            {user ? (
              <>
                <span className="user-badge">{user.name} ({user.role})</span>
                <button className="button button-outline" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="button button-outline" to="/login">Login</Link>
                <Link className="button" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4>Paradise Hotel</h4>
            <p>A modern guest and administration experience built with React.</p>
          </div>
          <div>
            <p>Course project for Web Programming.</p>
            <p>Frontend consumes the supplied Paradise Hotel API.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
