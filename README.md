# Booking System

Appointment booking system for small businesses. Built with Next.js, Prisma and PostgreSQL.

## Features

- **Customer-facing:**
  - Browse available services
  - 3-step booking wizard (service → date/time → details)
  - Booking confirmation

- **Admin panel:**
  - View all bookings
  - Confirm or cancel bookings
  - Add new services
  - Status badges (pending/confirmed/cancelled)

## Tech Stack

- Next.js 13 (Pages Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- CSS (custom design system)

## Setup

```bash
npm install
cp .env.example .env    # edit with your DB url
npx prisma db push
npm run dev
```

## API Routes

- `GET/POST /api/services` — list/create services
- `GET/POST /api/bookings` — list/create bookings
- `PATCH/DELETE /api/bookings/:id` — update status/delete
