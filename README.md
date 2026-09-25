# JERSFITT Plus — The Football Jersey That Works With You

> Premium, cinematic sportswear e-commerce platform for **JERSFITT Plus** — the innovative football performance jersey engineered with an **integrated sweat-wiping microfiber towel** and **quick-dry sports fabric**.

---

## ⚡ Quick Start & Local Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup & Seed Database
The application uses SQLite via Prisma for instant local execution without external database setup:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials (Seeded)

| Account Type | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Admin Portal** | `admin@jersfitt.com` | `admin123` | Full Backoffice Management (`/admin`) |
| **Customer User** | `alex.pereira@football.com` | `customer123` | Customer Account (`/account`) |

### Demo Order IDs for Live Tracking (`/track`):
- `JP-948210` (Status: **Shipped**, Paid via UPI)
- `JP-827104` (Status: **Packed**, Cash on Delivery)

### Demo Discount Coupons:
- `MATCHDAY10` — 10% OFF on orders above ₹1,000
- `JERSFITT20` — 20% OFF on orders above ₹2,500
- `FIRSTGOAL` — ₹200 Flat discount on orders above ₹1,500

---

## 🚀 Key Features & Architectural Highlights

1. **Cinematic First-Load Intro**:
   - 2.5s dark stadium floodlight & particle sequence.
   - Animated SVG jersey logo revealing tagline *"The jersey that works with you."*
   - Includes **Skip Intro** and `prefers-reduced-motion` compliance.

2. **Core Sportswear Innovations**:
   - **Built-In Towel**: Discreet microfiber inner-hem panel for instantaneous in-game face and visor wiping.
   - **Quick-Dry Fabric**: Aerated moisture-wicking weave that disperses perspiration up to 3x faster than traditional polyester jerseys.
   - **Side-by-Side Comparison**: Interactive breakdown of standard jerseys vs JERSFITT Plus.

3. **Complete E-Commerce Flow**:
   - Product catalog with multi-angle gallery, size & stock counters, dynamic size guide modal.
   - Persistent Shopping Bag (Guest LocalStorage + Account sync).
   - Real-time coupon validation engine.

4. **Indian Checkout & Payment Architecture**:
   - Validates 10-digit Indian phone numbers & 6-digit postal PIN codes.
   - **Cash on Delivery (COD)**: Configurable handling fee, automated stock reservation, and invoice receipt generation.
   - **UPI / Razorpay Gateway**: Secure server-side signature verification. Includes an **Interactive Razorpay Simulator** so presentation reviewers can test the full UPI QR / GPay / Card flow locally without requiring external API keys.

5. **Real-Time Order Tracking (`/track`)**:
   - 6-stage visual pipeline: *Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered*.
   - Live lookup by Order Number or registered contact info.

6. **Backoffice Admin Dashboard (`/admin`)**:
   - Real-time KPI summaries: Total Revenue, Total Orders, Pending Deliveries, Low-Stock Alerts.
   - One-click Order Status Pipeline updater.
   - Product Price & Size Inventory Manager.
   - Customer Review Moderation.

---

## ⚙️ Environment Variables (`.env`)

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="jersfitt_plus_super_secret_jwt_key_2026_innovation"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
*(Leave `RAZORPAY_KEY_ID` blank to run in sandbox simulation mode, or provide live test keys for production)*.
