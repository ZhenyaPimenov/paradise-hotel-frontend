import { api } from './client';
import type { Location } from '../types/location';
import type { Room, RoomSearchFilters } from '../types/room';

export const roomsApi = {
  async search(filters: RoomSearchFilters): Promise<{ rooms: Room[] }> {
    const { data } = await api.get('/api/rooms/availability', { params: filters });
    return data;
  },
  async locations(params: Partial<RoomSearchFilters>): Promise<{ locations: Location[] }> {
    const { data } = await api.get('/api/locations', { params });
    return data;
  },
};
