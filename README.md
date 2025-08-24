# ⚡ Smart Energy Usage & Billing Dashboard

A full-stack application that simulates how energy utilities manage **usage tracking, billing, and payments**. Built with **React + Spring Boot 3 + PostgreSQL**, secured with **JWT & role-based access**, and integrated with **Stripe Checkout + Webhook automation**.

---

## 🚀 Features
- **Role-Based Access**  
  - 👤 **User**: Track own usage, pay bills.  
  - 👨‍💼 **Admin**: Upload CSVs, manage users, view all bills.  
- **JWT Authentication** (Spring Security).  
- **Energy Usage Visualization** with interactive charts (Recharts).  
- **CSV Upload** for bulk meter readings (Admin only).  
- **Automated Billing** generation by date range.  
- **Stripe Checkout Integration** for payments.  
- **Stripe Webhook Listener** to auto-mark bills as **PAID**.  
- **Dockerized Microservices** deployment.

---

## 🏗️ Architecture
```
┌────────────┐      ┌──────────────┐      ┌──────────────┐
│  React UI  │ ---> │  Spring Boot │ ---> │  PostgreSQL  │
│  (Vite)    │      │  Backend API │      │   Database   │
└────────────┘      └──────────────┘      └──────────────┘
       │                       │
       ▼                       ▼
   Stripe.js          Stripe Checkout + Webhooks
```

---

## 💼 Use Cases
- **User**
  - View daily/monthly energy usage.
  - Generate bills for specific periods.
  - Pay invoices securely via Stripe.
- **Admin**
  - Upload bulk meter readings via CSV.
  - View and manage all user bills.
  - Oversee billing + payment lifecycle.
- **Finance Team**
  - Rely on webhook automation for reconciliation.


---

## ⚙️ Setup Guide

### 1. Local Development
**Backend:**
```bash
cd backend
mvn spring-boot:run
```
Runs on: http://localhost:8080

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:5173

### 2. Docker Deployment
```bash
docker compose up --build
```
Services:
- Frontend → http://localhost:5173
- Backend → http://localhost:8080
- Postgres → localhost:5432 (energy/energy/energydb)

### 3. Environment Config
**Backend (`application.properties`)**
```properties
app.security.jwt.secret=change-this-secret
stripe.secret-key=sk_test_...
stripe.publishable-key=pk_test_...
stripe.webhook-secret=whsec_...
```

**Frontend (`.env`)**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user.
- `POST /api/auth/login` → Login, returns JWT.

### Readings
- `POST /api/readings` (USER) → Add own reading.
- `GET /api/readings?userId=...` (USER/ADMIN).
- `POST /api/readings/import` (ADMIN) → Bulk CSV import.

### Billing
- `POST /api/billing/generate?userId=...` → Generate bill.
- `GET /api/billing?userId=...` → Fetch bills.
- `POST /api/billing/mark-paid/{billId}` → Mark bill paid.

### Stripe
- `POST /api/stripe/create-checkout-session?billId=...` → Start payment.
- `POST /api/stripe/webhook` → Webhook for auto-paid updates.

---

## 🔮 Future Improvements
- 📊 ML-based energy consumption forecasting.
- 📱 Mobile-first PWA.
- 🔔 Push notifications for due bills.
- 🌍 IoT smart meter integration.

---

## 📷 Demo Flow
1. User logs in with JWT auth.  
2. Dashboard shows usage (charts).  
3. User/Admin generates bill.  
4. User pays via Stripe Checkout.  
5. Stripe webhook auto-updates bill to PAID.  

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Axios, Recharts, Stripe.js
- **Backend**: Spring Boot 3, JPA, Spring Security (JWT)
- **Database**: PostgreSQL (H2 for local dev)
- **Payments**: Stripe Checkout + Webhooks
- **Deployment**: Docker & Docker Compose
