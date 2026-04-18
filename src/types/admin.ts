export interface DashboardSummary {
  totalReservations: number;
  activeReservations: number;
  cancelledReservations: number;
  totalUsers: number;
  totalLocations: number;
  totalRooms?: number;
}

export interface DashboardMetric {
  month?: string;
  name?: string;
  status?: string;
  count: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  reservationsByMonth: { month: string; count: number }[];
  reservationsByLocation: { name: string; count: number }[];
  reservationsByStatus: { status: string; count: number }[];
}
