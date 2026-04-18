import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AdminReservationsPage } from './AdminReservationsPage';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { role: 'admin' },
    isAdmin: true,
  }),
}));

describe('AdminReservationsPage', () => {
  it('renders reservations page', () => {
    render(
      <MemoryRouter>
        <AdminReservationsPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /reservations/i })).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AdminReservationsPage />
      </MemoryRouter>
    );
  });
  it('shows loading state', () => {
  render(
    <MemoryRouter>
      <AdminReservationsPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
});