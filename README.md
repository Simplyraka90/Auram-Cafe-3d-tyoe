# Aurum Café — Dark Chocolate 3D + Admin

Next.js App Router, Tailwind CSS, TypeScript, Three.js / React Three Fiber, Motion, Supabase REST and Supabase Auth.

## Features
- Original café home, menu, gallery, booking, contact and interactive 3D coffee/dessert scenes
- Admin dashboard at `/admin`: sign in, add/edit/delete products, availability toggle, see and update bookings, approve/reject/delete reviews
- Public reviews appear only after admin approval; menu reads admin-added products (original sample menu items remain visible)
- Secure server-side authorization on every admin API endpoint; HttpOnly SameSite=Strict cookie; no public DB RLS policies

## Setup (required)
1. Create a Supabase project and run `supabase-schema.sql`, then `supabase-admin-schema.sql` in SQL editor.
2. Under Supabase Authentication > Users, create an admin user with a strong password. Confirm the user's email (via verification or trusted manual confirmation). Do not enable public sign-ups for admin access.
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAILS` (comma-separated, exact approved emails). Never expose service role key to client or use `NEXT_PUBLIC_` prefix for it.
4. `npm install`, `npm run dev`; visit `/admin` and sign in.
5. Deploy on HTTPS, add environment variables in hosting settings, and verify DB, booking and review workflows.

## Notes
- This is an admin **management** dashboard, not an online payment or table-capacity system. Booking confirmation is a status update only; it does not send emails or SMS.
- Product images use HTTPS URLs, not file upload. Original sample menu products remain static; admin CRUD applies to database products.
- Supabase Auth access token cookie expires in up to 1 hour; sign in again when expired. Production deployments should add rate limiting to login and public review/booking submissions, audit logging, and CSRF defenses for stricter environments. SameSite Strict cookies and JSON-only APIs reduce but do not eliminate CSRF risks.
- Public reviews are held pending moderation. The site does not verify that a reviewer purchased anything.
- Run `npm run lint` (TypeScript) and `npm run build` before production. Browser/device visual testing is still needed.
