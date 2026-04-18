import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { SearchRoomsPage } from './SearchRoomsPage';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isAdmin: false,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  }),
}));

describe('SearchRoomsPage', () => {
  it('renders search page', () => {
    render(
      <MemoryRouter>
        <SearchRoomsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/search available rooms/i)).toBeInTheDocument();
  });
  it('renders search inputs', () => {
  render(
    <MemoryRouter>
      <SearchRoomsPage />
    </MemoryRouter>
  );

  expect(screen.getByRole('button', { name: /search rooms/i })).toBeInTheDocument();
});
});