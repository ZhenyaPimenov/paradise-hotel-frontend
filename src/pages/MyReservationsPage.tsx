import { useEffect, useState } from 'react';
import { reservationsApi } from '../api/reservationsApi';
import { ReservationCard } from '../components/reservations/ReservationCard';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Alert } from '../components/ui/Alert';
import { Loader } from '../components/ui/Loader';
import { getErrorMessage } from '../utils/http';
import type { Reservation } from '../types/reservation';

export function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await reservationsApi.mine();
      setReservations(data.reservations);
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not load reservations.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const cancelReservation = async (id: number) => {
    try {
      setBusyId(id);
      setMessage('');
      await reservationsApi.cancel(id);
      setMessage('Reservation cancelled successfully.');
      await load();
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not cancel reservation.'));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="container page-section">
      <SectionIntro eyebrow="My account" title="My Reservations" text="Review your current and past bookings. Active reservations can be cancelled from this page." />
      {error && <Alert message={error} />}
      {message && <Alert tone="success" message={message} />}
      {loading ? (
        <Loader text="Loading reservations..." />
      ) : reservations.length === 0 ? (
        <div className="panel"><p>No reservations found yet.</p></div>
      ) : (
        <div className="results-grid">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} onCancel={cancelReservation} disabled={busyId === reservation.id} />
          ))}
        </div>
      )}
    </section>
  );
}
