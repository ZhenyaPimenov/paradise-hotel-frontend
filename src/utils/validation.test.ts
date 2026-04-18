import { validateAuthForm, validateSearchDates } from './validation';

describe('validation helpers', () => {
  it('validates auth form fields', () => {
    const result = validateAuthForm('', 'wrong', '123', true);
    expect(result.name).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
  });

  it('validates search dates', () => {
    const result = validateSearchDates('2026-05-10', '2026-05-08');
    expect(result.checkOut).toMatch(/later than/i);
  });
});
