import { api } from './client';
import type { DashboardResponse } from '../types/admin';
import type { Location, LocationPayload } from '../types/location';
import type { Reservation } from '../types/reservation';

export const adminApi = {
  async dashboard(): Promise<DashboardResponse> {
    const { data } = await api.get('/api/admin/dashboard');
    return data;
  },
  async reservations(): Promise<{ reservations: Reservation[] }> {
    const { data } = await api.get('/api/admin/reservations');
    return data;
  },
  async locations(): Promise<{ locations: Location[] }> {
    const { data } = await api.get('/api/admin/locations');
    return data;
  },
  async createLocation(payload: LocationPayload) {
    const { data } = await api.post('/api/admin/locations', payload);
    return data;
  },
  async updateLocation(id: number, payload: LocationPayload) {
    const { data } = await api.put(`/api/admin/locations/${id}`, payload);
    return data;
  },
  async deleteLocation(id: number) {
    const { data } = await api.delete(`/api/admin/locations/${id}`);
    return data;
  },
};
