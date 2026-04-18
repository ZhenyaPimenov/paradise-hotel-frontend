export const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(value);

export const readableDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
