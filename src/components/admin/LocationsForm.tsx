import { useEffect, useState } from 'react';
import type { Location, LocationPayload } from '../../types/location';

const emptyForm: LocationPayload = {
  name: '',
  city: '',
  address: '',
  description: '',
  rating: 5,
  hasFreeParking: false,
  hasWellnessCenter: false,
  imageUrl: '',
};

export function LocationsForm({ initialValue, onSubmit, busy }: { initialValue?: Location | null; onSubmit: (payload: LocationPayload) => Promise<void>; busy?: boolean }) {
  const [values, setValues] = useState<LocationPayload>(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValue) {
      setValues({
        name: initialValue.name,
        city: initialValue.city,
        address: initialValue.address,
        description: initialValue.description,
        rating: initialValue.rating,
        hasFreeParking: initialValue.hasFreeParking,
        hasWellnessCenter: initialValue.hasWellnessCenter,
        imageUrl: initialValue.imageUrl || '',
      });
    } else {
      setValues(emptyForm);
    }
  }, [initialValue]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.name || !values.city || !values.address || !values.description) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    await onSubmit({ ...values, rating: Number(values.rating) });
  };

  const update = (key: keyof LocationPayload, value: string | boolean | number) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <h3>{initialValue ? 'Edit location' : 'Create location'}</h3>
      {error && <div className="alert alert-error">{error}</div>}
      <div><label>Name</label><input value={values.name} onChange={(e) => update('name', e.target.value)} /></div>
      <div><label>City</label><input value={values.city} onChange={(e) => update('city', e.target.value)} /></div>
      <div className="full-width"><label>Address</label><input value={values.address} onChange={(e) => update('address', e.target.value)} /></div>
      <div className="full-width"><label>Description</label><textarea rows={4} value={values.description} onChange={(e) => update('description', e.target.value)} /></div>
      <div><label>Rating</label><input type="number" min="1" max="5" step="0.1" value={values.rating} onChange={(e) => update('rating', Number(e.target.value))} /></div>
      <div><label>Image URL</label><input value={values.imageUrl || ''} onChange={(e) => update('imageUrl', e.target.value)} /></div>
      <label className="checkbox-row"><input type="checkbox" checked={values.hasFreeParking} onChange={(e) => update('hasFreeParking', e.target.checked)} />Free parking</label>
      <label className="checkbox-row"><input type="checkbox" checked={values.hasWellnessCenter} onChange={(e) => update('hasWellnessCenter', e.target.checked)} />Wellness center</label>
      <div className="form-actions full-width"><button className="button" disabled={busy}>{busy ? 'Saving...' : initialValue ? 'Update location' : 'Create location'}</button></div>
    </form>
  );
}
