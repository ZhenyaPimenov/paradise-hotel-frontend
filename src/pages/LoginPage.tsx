import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateAuthForm } from '../utils/validation';
import { Alert } from '../components/ui/Alert';
import { SectionIntro } from '../components/ui/SectionIntro';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateAuthForm('', email, password);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      setBusy(true);
      setServerError('');
      await login({ email, password });
      navigate(location.state?.from || '/search');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container page-section auth-grid">
      <div>
        <SectionIntro eyebrow="Welcome back" title="Login to your account" text="Enter your email and password to continue." />
      </div>
      <form className="panel form-grid" onSubmit={submit}>
        {serverError && <Alert message={serverError} />}
        <div className="full-width">
          <label htmlFor="email">Email</label>
          <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </div>
        <div className="full-width">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <small className="field-error">{errors.password}</small>}
        </div>
        <div className="form-actions full-width">
          <button className="button" disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
        </div>
        <p className="subtle full-width">No account yet? <Link to="/register">Register here</Link>.</p>
      </form>
    </section>
  );
}
