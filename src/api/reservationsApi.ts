import { api } from './client';
import type { Reservation, ReservationPayload } from '../types/reservation';

export const reservationsApi = {
  async create(payload: ReservationPayload) {
    const { data } = await api.post('/api/reservations', payload);
    return data;
  },
  async mine(): Promise<{ reservations: Reservation[] }> {
    const { data } = await api.get('/api/reservations/me');
    return data;
  },
  async cancel(id: number) {
    const { data } = await api.delete(`/api/reservations/${id}`);
    return data;
  },
};
