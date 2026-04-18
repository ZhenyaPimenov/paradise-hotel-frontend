import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

const mockLogout = vi.fn();
const mockUseAuth = vi.fn();

vi.mock('./context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('AppLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows public navigation for guests', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      logout: mockLogout,
      isAdmin: false,
    });

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

expect(screen.getByRole('link', { name: /paradise hotel/i })).toBeInTheDocument();    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /search rooms/i })).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: /my reservations/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^admin$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /locations/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /reservations/i })).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('shows user navigation for authenticated non-admin users', () => {
    mockUseAuth.mockReturnValue({
      user: { name: 'Test User', role: 'user' },
      logout: mockLogout,
      isAdmin: false,
    });

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /my reservations/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^admin$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /locations/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^reservations$/i })).not.toBeInTheDocument();

    expect(screen.getByText(/test user/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('shows admin navigation and handles logout', () => {
    mockUseAuth.mockReturnValue({
      user: { name: 'Paradise Admin', role: 'admin' },
      logout: mockLogout,
      isAdmin: true,
    });

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /^admin$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /locations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^reservations$/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});