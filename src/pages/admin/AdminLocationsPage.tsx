import { useEffect, useState } from 'react';
import { adminApi } from '../../api/adminApi';
import { LocationsForm } from '../../components/admin/LocationsForm';
import { SectionIntro } from '../../components/ui/SectionIntro';
import { Alert } from '../../components/ui/Alert';
import { Loader } from '../../components/ui/Loader';
import { getErrorMessage } from '../../utils/http';
import type { Location, LocationPayload } from '../../types/location';

export function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminApi.locations();
      setLocations(data.locations);
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not load locations.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (payload: LocationPayload) => {
    try {
      setSaving(true);
      setError('');
      if (editing) {
        const data = await adminApi.updateLocation(editing.id, payload);
        setMessage(data.message);
      } else {
        const data = await adminApi.createLocation(payload);
        setMessage(data.message);
      }
      setEditing(null);
      await load();
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not save location.'));
    } finally {
      setSaving(false);
    }
  };

  const removeLocation = async (id: number) => {
    try {
      setError('');
      const data = await adminApi.deleteLocation(id);
      setMessage(data.message);
      await load();
    } catch (apiError) {
      setError(getErrorMessage(apiError, 'Could not delete location.'));
    }
  };

  return (
    <section className="container page-section">
      <SectionIntro eyebrow="Admin" title="Locations management" text="Create, edit and delete hotel locations using the supplied admin endpoints." />
      {error && <Alert message={error} />}
      {message && <Alert tone="success" message={message} />}
      <div className="admin-locations-grid">
        <LocationsForm initialValue={editing} onSubmit={submit} busy={saving} />
        <div className="panel table-wrap">
          <div className="table-actions">
            <h3>Existing locations</h3>
            {editing && <button className="button button-outline" onClick={() => setEditing(null)}>Clear editing</button>}
          </div>
          {loading ? (
            <Loader text="Loading locations..." />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Rating</th>
                  <th>Rooms</th>
                  <th>Parking</th>
                  <th>Wellness</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id}>
                    <td>{location.name}</td>
                    <td>{location.city}</td>
                    <td>{location.rating}</td>
                    <td>{location.roomCount ?? '-'}</td>
                    <td>{location.hasFreeParking ? 'Yes' : 'No'}</td>
                    <td>{location.hasWellnessCenter ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="inline-actions">
                        <button className="button button-outline button-small" onClick={() => setEditing(location)}>Edit</button>
                        <button className="button button-danger button-small" onClick={() => void removeLocation(location.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
