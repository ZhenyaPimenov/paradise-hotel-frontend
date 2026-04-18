import type { DashboardSummary } from '../../types/admin';

const cards = [
  { key: 'totalReservations', label: 'Total reservations' },
  { key: 'activeReservations', label: 'Active reservations' },
  { key: 'cancelledReservations', label: 'Cancelled reservations' },
  { key: 'totalUsers', label: 'Users' },
  { key: 'totalLocations', label: 'Locations' },
] as const;

export function SummaryCards({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <div key={card.key} className="panel metric-card">
          <span>{card.label}</span>
          <strong>{summary[card.key]}</strong>
        </div>
      ))}
    </div>
  );
}
