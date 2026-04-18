import { useMemo, useState } from 'react';
import { SearchForm } from '../components/rooms/SearchForm';
import { RoomCard } from '../components/rooms/RoomCard';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Alert } from '../components/ui/Alert';
import { roomsApi } from '../api/roomsApi';
import { reservationsApi } from '../api/reservationsApi';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/http';
import type { Room, RoomSearchFilters } from '../types/room';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const initialFilters: RoomSearchFilters = {
  checkIn: formatDate(today),
  checkOut: formatDate(tomorrow),
  guests: 1,
  search: '',
  city: '',
  rating: 0,
  freeParking: false,
  wellnessCenter: false,
};

export function SearchRoomsPage() {
  const { isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState<RoomSearchFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [bookingRoomId, setBookingRoomId] = useState<number | null>(null);

  const normalizedFilters = useMemo(() => ({
    ...filters,
    rating: filters.rating || undefined,
    search: filters.search || undefined,
    city: filters.city || undefined,
  }), [filters]);

  const submit = async (values: RoomSearchFilters) => {
    setFilters(values);
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await roomsApi.search({
        ...values,
        rating: values.rating || undefined,
        search: values.search || undefined,
        city: values.city || undefined,
      });
      setRooms(data.rooms);
      if (data.rooms.length === 0) {
        setMessage('No rooms matched the selected criteria.');
      }
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not search rooms.'));
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const reserveRoom = async (room: Room) => {
    if (!isAuthenticated) {
      setError('Please log in before creating a reservation.');
      return;
    }

    try {
      setBookingRoomId(room.id);
      setError('');
      const data = await reservationsApi.create({
        roomId: room.id,
        checkIn: normalizedFilters.checkIn,
        checkOut: normalizedFilters.checkOut,
        guests: normalizedFilters.guests,
      });
      setMessage(`${data.message} Reservation ID: ${data.reservationId}.`);
      await submit(filters);
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Reservation failed.'));
    } finally {
      setBookingRoomId(null);
    }
  };

  return (
    <section className="container page-section">
      <SectionIntro eyebrow="Room search" title="Search available rooms" text="Choose dates, guests and optional hotel filters to view live availability from the API." />
      <SearchForm initialValues={filters} onSubmit={submit} loading={loading} />
      {error && <Alert message={error} />}
      {message && <Alert tone="success" message={message} />}
      <div className="results-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onReserve={reserveRoom} disabled={bookingRoomId === room.id} />
        ))}
      </div>
    </section>
  );
}
