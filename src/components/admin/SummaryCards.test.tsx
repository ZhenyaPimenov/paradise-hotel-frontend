import { render, screen } from '@testing-library/react';
import { SummaryCards } from './SummaryCards';

describe('SummaryCards', () => {
  it('renders summary values', () => {
    render(
      <SummaryCards
        summary={{
          totalReservations: 20,
          activeReservations: 12,
          cancelledReservations: 8,
          totalUsers: 9,
          totalLocations: 4,
        }}
      />,
    );

    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
