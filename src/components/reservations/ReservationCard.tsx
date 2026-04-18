import { readableDate } from '../../utils/format';
import type { Reservation } from '../../types/reservation';

export function ReservationCard({ reservation, onCancel, disabled = false }: { reservation: Reservation; onCancel?: (id: number) => void; disabled?: boolean }) {
  return (
    <article className="panel reservation-card">
      <div className="room-topline">
        <div>
          <h3>{reservation.roomName}</h3>
          <p className="subtle">{reservation.locationName} · {reservation.locationCity}</p>
        </div>
        <span className={`status-chip ${reservation.status}`}>{reservation.status}</span>
      </div>

      <div className="meta-grid">
        <span>{reservation.roomType}</span>
        <span>{readableDate(reservation.checkIn)} → {readableDate(reservation.checkOut)}</span>
        <span>{reservation.guests} guest(s)</span>
      </div>

      {onCancel && reservation.status === 'active' && (
        <button className="button button-danger" onClick={() => onCancel(reservation.id)} disabled={disabled}>
          Cancel reservation
        </button>
      )}
    </article>
  );
}
