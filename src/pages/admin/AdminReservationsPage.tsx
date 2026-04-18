import { useEffect, useState } from 'react';
import { adminApi } from '../../api/adminApi';
import { SectionIntro } from '../../components/ui/SectionIntro';
import { Loader } from '../../components/ui/Loader';
import { Alert } from '../../components/ui/Alert';
import { readableDate } from '../../utils/format';
import { getErrorMessage } from '../../utils/http';
import type { Reservation } from '../../types/reservation';

export function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminApi.reservations();
        setReservations(data.reservations);
      } catch (apiError) {
        setError(getErrorMessage(apiError, 'Could not load reservations.'));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <section className="container page-section">
      <SectionIntro eyebrow="Admin" title="Reservations" text="All reservations across the system, including guest details and reservation status." />
      {error && <Alert message={error} />}
      {loading ? (
        <Loader text="Loading reservations..." />
      ) : (
        <div className="panel table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Email</th>
                <th>Room</th>
                <th>Location</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.guestEmail}</td>
                  <td>{reservation.roomName}</td>
                  <td>{reservation.locationName}, {reservation.locationCity}</td>
                  <td>{readableDate(reservation.checkIn)} – {readableDate(reservation.checkOut)}</td>
                  <td>{reservation.guests}</td>
                  <td><span className={`status-chip ${reservation.status}`}>{reservation.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
