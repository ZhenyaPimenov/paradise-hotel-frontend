import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('renders child content for authenticated users', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      loading: false,
    } as never);

    render(
      <MemoryRouter>
        <ProtectedRoute><div>Secret page</div></ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Secret page')).toBeInTheDocument();
  });
});
