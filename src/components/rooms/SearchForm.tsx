import { useState } from 'react';
import { validateSearchDates } from '../../utils/validation';
import type { RoomSearchFilters } from '../../types/room';

interface Props {
  initialValues: RoomSearchFilters;
  onSubmit: (values: RoomSearchFilters) => Promise<void> | void;
  loading?: boolean;
}

export function SearchForm({ initialValues, onSubmit, loading = false }: Props) {
  const [values, setValues] = useState<RoomSearchFilters>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof RoomSearchFilters, value: string | number | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateSearchDates(values.checkIn, values.checkOut);
    if (values.guests < 1) {
      validation.guests = 'Guests must be at least 1.';
    }
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    await onSubmit(values);
  };

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <div>
        <label htmlFor="checkIn">Check-in</label>
        <input id="checkIn" type="date" value={values.checkIn} onChange={(e) => handleChange('checkIn', e.target.value)} />
        {errors.checkIn && <small className="field-error">{errors.checkIn}</small>}
      </div>
      <div>
        <label htmlFor="checkOut">Check-out</label>
        <input id="checkOut" type="date" value={values.checkOut} onChange={(e) => handleChange('checkOut', e.target.value)} />
        {errors.checkOut && <small className="field-error">{errors.checkOut}</small>}
      </div>
      <div>
        <label htmlFor="guests">Guests</label>
        <input id="guests" type="number" min="1" value={values.guests} onChange={(e) => handleChange('guests', Number(e.target.value))} />
        {errors.guests && <small className="field-error">{errors.guests}</small>}
      </div>
      <div>
        <label htmlFor="search">Hotel name</label>
        <input id="search" value={values.search || ''} onChange={(e) => handleChange('search', e.target.value)} placeholder="Paradise" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input id="city" value={values.city || ''} onChange={(e) => handleChange('city', e.target.value)} placeholder="Varna" />
      </div>
      <div>
        <label htmlFor="rating">Minimum rating</label>
        <input id="rating" type="number" min="1" max="5" step="0.1" value={values.rating || ''} onChange={(e) => handleChange('rating', e.target.value ? Number(e.target.value) : 0)} />
      </div>
      <label className="checkbox-row">
        <input type="checkbox" checked={Boolean(values.freeParking)} onChange={(e) => handleChange('freeParking', e.target.checked)} />
        Free parking
      </label>
      <label className="checkbox-row">
        <input type="checkbox" checked={Boolean(values.wellnessCenter)} onChange={(e) => handleChange('wellnessCenter', e.target.checked)} />
        Wellness center
      </label>
      <div className="form-actions full-width">
        <button className="button" type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search rooms'}</button>
      </div>
    </form>
  );
}
