import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from './RegisterPage';

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
expect(await screen.findByText(/password is required/i)).toBeInTheDocument();  });

  it('shows success message after registration', async () => {
    mockRegister.mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/account created successfully/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });
  });
});