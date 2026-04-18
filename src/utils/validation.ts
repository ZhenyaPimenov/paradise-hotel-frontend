export function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validateAuthForm(name: string, email: string, password: string, requireName = false) {
  const errors: Record<string, string> = {};

  if (requireName && !name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password.trim()) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateSearchDates(checkIn: string, checkOut: string) {
  const errors: Record<string, string> = {};
  if (!checkIn) {
    errors.checkIn = 'Check-in date is required.';
  }
  if (!checkOut) {
    errors.checkOut = 'Check-out date is required.';
  }
  if (checkIn && checkOut && checkIn >= checkOut) {
    errors.checkOut = 'Check-out must be later than check-in.';
  }
  return errors;
}
