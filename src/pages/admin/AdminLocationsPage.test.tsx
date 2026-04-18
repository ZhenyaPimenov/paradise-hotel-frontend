import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AdminLocationsPage } from './AdminLocationsPage';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { role: 'admin' },
    isAdmin: true,
  }),
}));

describe('AdminLocationsPage', () => {
  it('renders locations page', () => {
    render(
      <MemoryRouter>
        <AdminLocationsPage />
      </MemoryRouter>
    );

    expect(
  screen.getByRole('heading', { level: 1, name: /locations management/i })
).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AdminLocationsPage />
      </MemoryRouter>
    );
  });
  it('renders form fields', () => {
  render(
    <MemoryRouter>
      <AdminLocationsPage />
    </MemoryRouter>
  );

  expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
});
});