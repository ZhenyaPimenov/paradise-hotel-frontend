export interface Reservation {
  id: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'active' | 'cancelled';
  createdAt?: string;
  guestName?: string;
  guestEmail?: string;
  roomName: string;
  roomType: string;
  locationName: string;
  locationCity: string;
}

export interface ReservationPayload {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}
