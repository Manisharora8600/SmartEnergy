# Smart Energy Usage & Billing Dashboard

Full-stack project (React + Spring Boot 3 + PostgreSQL/H2) with JWT auth, role-based APIs (ADMIN/USER), CSV ingest, Stripe Checkout payments, and a Stripe webhook to auto-mark bills **PAID**.

## Quick Start (Local)
### Backend
```bash
cd backend
mvn -DskipTests package
java -jar target/*.jar
```
- H2 console: `/h2-console`
- Config: `src/main/resources/application.properties`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## JWT & Roles
- Register/login: `/api/auth/register`, `/api/auth/login`
- Default role: `USER`. Promote to `ADMIN` by updating `users.role` in DB.
- CSV import endpoint is **ADMIN-only**.

## Stripe
- Set in `application.properties`:
```
stripe.secret-key=sk_test_...
stripe.publishable-key=pk_test_...
stripe.success-url=http://localhost:5173?payment=success
stripe.cancel-url=http://localhost:5173?payment=cancel
stripe.webhook-secret=whsec_...
```
- Frontend `.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
- Create **Checkout Session**: `POST /api/stripe/create-checkout-session?billId=...`
- Webhook: `POST /api/stripe/webhook` listens for `checkout.session.completed` and sets bill `PAID`.

## ASCII Architecture
```
+-----------------+      JWT       +-------------------+       JDBC      +-------------+
|   React (Vite)  | <----------->  | Spring Boot API   |  ----------->  | Postgres/H2 |
| Login/Charts    |    Axios       | Auth/Billing/Pay  |               +-------------+
| Stripe.js       |                | Stripe & Webhook  |
+-----------------+                +-------------------+
```

## API (Highlights)
- `POST /api/readings` (USER/ADMIN) → create reading (USER forced to self)
- `GET /api/readings?userId=` (USER/ADMIN) → list readings
- `GET /api/readings/summary?userId=` (USER/ADMIN)
- `POST /api/readings/import` (ADMIN) → CSV
- `POST /api/billing/generate?userId=&periodStart=&periodEnd=` (USER→self, ADMIN→any)
- `GET /api/billing?userId=` (USER→self, ADMIN→any)
- `POST /api/billing/mark-paid/{billId}` (ADMIN)
- `POST /api/payments/pay?billId=` (mock)
- `POST /api/stripe/create-checkout-session?billId=`
- `POST /api/stripe/webhook` (public, signature verified)
