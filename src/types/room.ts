import type { Location } from './location';

export interface Room {
  id: number;
  locationId: number;
  name: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  description: string;
  imageUrl?: string;
  location: Location;
}

export interface RoomSearchFilters {
  checkIn: string;
  checkOut: string;
  guests: number;
  search?: string;
  city?: string;
  rating?: number;
  freeParking?: boolean;
  wellnessCenter?: boolean;
}
