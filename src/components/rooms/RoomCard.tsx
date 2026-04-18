import { currency } from '../../utils/format';
import type { Room } from '../../types/room';

interface Props {
  room: Room;
  onReserve?: (room: Room) => void;
  disabled?: boolean;
}

export function RoomCard({ room, onReserve, disabled = false }: Props) {
  return (
    <article className="room-card panel">
      <div className="room-topline">
        <div>
          <h3>{room.name}</h3>
          <p className="subtle">{room.type} · up to {room.capacity} guests</p>
        </div>
        <strong>{currency(room.pricePerNight)} / night</strong>
      </div>

      <p>{room.description}</p>

      <div className="meta-grid">
        <span>{room.location.name}</span>
        <span>{room.location.city}</span>
        <span>Rating {room.location.rating}</span>
        <span>{room.location.hasFreeParking ? 'Free parking' : 'No free parking'}</span>
        <span>{room.location.hasWellnessCenter ? 'Wellness center' : 'No wellness center'}</span>
      </div>

      {onReserve && (
        <button className="button" onClick={() => onReserve(room)} disabled={disabled}>
          Reserve this room
        </button>
      )}
    </article>
  );
}
