import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoomCard } from './RoomCard';

const room = {
  id: 1,
  locationId: 2,
  name: 'Sea View Deluxe',
  type: 'Deluxe',
  capacity: 2,
  pricePerNight: 180,
  description: 'Spacious room.',
  location: {
    id: 2,
    name: 'Paradise Hotel Varna',
    city: 'Varna',
    address: 'Center',
    description: 'Beach hotel',
    rating: 4.8,
    hasFreeParking: true,
    hasWellnessCenter: true,
    imageUrl: '',
  },
};

describe('RoomCard', () => {
  it('fires reserve callback', async () => {
    const user = userEvent.setup();
    const onReserve = vi.fn();
    render(<RoomCard room={room} onReserve={onReserve} />);

    await user.click(screen.getByRole('button', { name: /reserve this room/i }));
    expect(onReserve).toHaveBeenCalledWith(room);
  });
});
