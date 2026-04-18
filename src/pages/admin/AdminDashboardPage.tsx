import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Legend, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { adminApi } from '../../api/adminApi';
import { SummaryCards } from '../../components/admin/SummaryCards';
import { SectionIntro } from '../../components/ui/SectionIntro';
import { Loader } from '../../components/ui/Loader';
import { Alert } from '../../components/ui/Alert';
import { getErrorMessage } from '../../utils/http';
import type { DashboardResponse } from '../../types/admin';

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await adminApi.dashboard();
        setData(response);
      } catch (apiError) {
        setError(getErrorMessage(apiError, 'Could not load dashboard data.'));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <section className="container page-section">
      <SectionIntro eyebrow="Admin" title="Dashboard" text="Overview of reservations, users and hotel location performance." />
      {error && <Alert message={error} />}
      {loading || !data ? (
        <Loader text="Loading dashboard..." />
      ) : (
        <>
          <SummaryCards summary={data.summary} />
          <div className="chart-grid">
            <div className="panel chart-panel">
              <h3>Reservations by month</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.reservationsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Reservations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="panel chart-panel">
              <h3>Reservations by status</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={data.reservationsByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} label>
                    {data.reservationsByStatus.map((item) => (
                      <Cell key={item.status} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="panel chart-panel full-width">
              <h3>Reservations by location</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data.reservationsByLocation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Reservations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
