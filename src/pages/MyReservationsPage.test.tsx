import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MyReservationsPage } from './MyReservationsPage';

vi.mock('../api/client', () => ({
  api: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

import { api } from '../api/client';

describe('MyReservationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows empty state when no reservations', async () => {
    (api.get as any).mockResolvedValue({
      data: {
        reservations: [],
      },
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/no reservations/i)).toBeInTheDocument();
  });

  it('renders reservations list', async () => {
    (api.get as any).mockResolvedValue({
      data: {
        reservations: [
          {
            id: 1,
            checkIn: '2026-04-20',
            checkOut: '2026-04-22',
            guests: 2,
            status: 'active',
            roomName: 'Deluxe Room',
            roomType: 'Deluxe',
            locationName: 'Paradise Varna',
            locationCity: 'Varna',
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/deluxe room/i)).toBeInTheDocument();
    expect(screen.getByText(/paradise varna/i)).toBeInTheDocument();
  });

  it('allows cancelling reservation', async () => {
    (api.get as any).mockResolvedValue({
      data: {
        reservations: [
          {
            id: 1,
            checkIn: '2026-04-20',
            checkOut: '2026-04-22',
            guests: 2,
            status: 'active',
            roomName: 'Deluxe Room',
            roomType: 'Deluxe',
            locationName: 'Paradise Varna',
            locationCity: 'Varna',
          },
        ],
      },
    });

    (api.delete as any).mockResolvedValue({
      data: { message: 'Reservation cancelled successfully.' },
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalled();
    });
  });
});