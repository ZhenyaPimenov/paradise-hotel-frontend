import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateAuthForm } from '../utils/validation';
import { Alert } from '../components/ui/Alert';
import { SectionIntro } from '../components/ui/SectionIntro';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateAuthForm(name, email, password, true);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      setBusy(true);
      setServerError('');
      await register({ name, email, password });
      setSuccess('Account created successfully. You can now log in.');
      setTimeout(() => navigate('/login'), 800);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Registration failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container page-section auth-grid">
      <div>
        <SectionIntro eyebrow="Create account" title="Register for Paradise Hotel" text="Standard users can create bookings and manage their reservations." />
      </div>
      <form className="panel form-grid" onSubmit={submit}>
        {serverError && <Alert message={serverError} />}
        {success && <Alert tone="success" message={success} />}
        <div className="full-width">
          <label htmlFor="name">Full name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </div>
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
          <button className="button" disabled={busy}>{busy ? 'Creating...' : 'Create account'}</button>
        </div>
        <p className="subtle full-width">Already registered? <Link to="/login">Go to login</Link>.</p>
      </form>
    </section>
  );
}
