import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders home content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: /find your next coastal escape with a modern booking experience/i,
      }),
    ).toBeInTheDocument();
  });
});