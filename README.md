# Paradise Hotel Frontend

React frontend for the Paradise Hotel coursework project. The application consumes the supplied backend API and provides guest, user and administrator flows.

## Features

- Home and About pages
- Register and Login forms
- Room availability search with filters
- Reservation creation and cancellation
- My Reservations page for authenticated users
- Admin Dashboard with charts
- Admin Reservations table
- Admin Locations CRUD
- Protected user-only and admin-only routes
- Component tests with Vitest and React Testing Library

## Tech stack

- React + TypeScript
- Vite
- Axios
- React Router
- Recharts
- Vitest + React Testing Library
- Custom responsive CSS

## How to run

### 1. Run the supplied backend
Open the backend folder and run:

```bash
npm install
npm run dev
```

The backend should start on `http://localhost:4000`.

### 2. Run the frontend
In this frontend folder:

```bash
npm install
cp .env.example .env
npm run dev
```

The Vite development server will start on `http://localhost:5173`.

## Demo admin account
Seeded by the supplied backend:

- Email: `admin@paradise.local`
- Password: `Admin123!`

## Suggested test flow

1. Open Home page.
2. Register a new standard account.
3. Login.
4. Search for available rooms with valid dates.
5. Create a reservation.
6. Open My Reservations and cancel the reservation.
7. Login as the admin user.
8. Check the dashboard charts.
9. Open Admin Reservations.
10. Open Admin Locations and create, edit, and attempt to delete a location.

## Test commands

```bash
npm test
npm run coverage
```

## Project structure

```text
src/
  api/
  components/
  context/
  hooks/
  pages/
  test/
  types/
  utils/
```
## How to run the project

1. Install dependencies:
npm install

2. Start the development server:
npm run dev

3. Run tests:
npm test

4. Generate coverage report:
npm run coverage
