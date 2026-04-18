import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AdminDashboardPage } from './AdminDashboardPage';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { role: 'admin' },
    isAdmin: true,
  }),
}));

describe('AdminDashboardPage', () => {
  it('renders admin dashboard', () => {
    render(
      <MemoryRouter>
        <AdminDashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AdminDashboardPage />
      </MemoryRouter>
    );
  });
  it('shows loading dashboard', () => {
  render(
    <MemoryRouter>
      <AdminDashboardPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
});