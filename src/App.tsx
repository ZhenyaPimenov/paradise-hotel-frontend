import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AdminRoute, ProtectedRoute, PublicOnlyRoute } from './components/routing/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchRoomsPage } from './pages/SearchRoomsPage';
import { MyReservationsPage } from './pages/MyReservationsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminReservationsPage } from './pages/admin/AdminReservationsPage';
import { AdminLocationsPage } from './pages/admin/AdminLocationsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchRoomsPage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <MyReservationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <AdminRoute>
              <AdminReservationsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/locations"
          element={
            <AdminRoute>
              <AdminLocationsPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
