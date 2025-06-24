
# 🖥️ ShelfCam Frontend

**React-based dashboard for real-time shelf monitoring and inventory management**, built for Walmart Sparkathon 2025. This frontend connects with the ShelfCam backend to visualize AI-detected alerts, current stock status, and user-specific task views.

---

## 🚀 Features

- 📊 Role-based Dashboard (Staff, Manager, Admin)
- 🔔 Real-time Alerts for Misplaced Items, Low Stock, Fallen Goods
- 📦 Inventory Visibility by Category and Shelf
- 🔐 JWT Authentication Integration
- 🌐 Public Display Mode (No login required)
- 🎨 Responsive UI for In-store Kiosk or Mobile

---

## 🧰 Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | React.js             |
| Styling      | Tailwind CSS         |
| API Client   | Axios                |
| Routing      | React Router         |
| Auth         | JWT (via Backend)    |
| Charts       | Recharts / Chart.js  |
| Backend API  | [shelfcam-backend](https://github.com/<your-username>/shelfcam-backend)

---

## 📦 Project Structure

```
shelfcam-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── AlertsPanel/
│   │   ├── InventoryTable/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   └── Settings.js
│   ├── services/
│   │   └── api.js               # Axios API client
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env                         # Frontend base API URL
├── package.json
└── README.md
```

---

## 🧪 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/shelfcam-frontend.git
cd shelfcam-frontend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure `.env` file

```ini
REACT_APP_API_URL=http://localhost:8000
```

> Update this if backend runs on a different port or domain.

---

### 4. Run the development server

```bash
npm run dev
# OR
npm start
```

Frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📌 To-Do / Roadmap

- [ ] Add real-time socket updates (WebSocket/SignalR)
- [ ] Role-specific UI restrictions
- [ ] Camera feed integration preview
- [ ] Deploy to Vercel/Netlify

---

## 🛡 License

This project is licensed for educational and hackathon use.

---

## 🔗 Related Repos

- **Backend:** [`shelfcam-backend`](https://github.com/<your-username>/shelfcam-backend)
- **Demo & Pitch Deck:** *(link once uploaded)*
