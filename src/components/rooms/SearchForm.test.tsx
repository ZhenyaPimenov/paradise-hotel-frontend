import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  it('shows validation when dates are invalid', async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        initialValues={{ checkIn: '2026-05-10', checkOut: '2026-05-09', guests: 1 }}
        onSubmit={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /search rooms/i }));
    expect(screen.getByText(/check-out must be later than check-in/i)).toBeInTheDocument();
  });
});
