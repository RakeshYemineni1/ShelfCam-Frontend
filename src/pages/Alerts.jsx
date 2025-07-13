// src/pages/Alerts.jsx
import { useEffect, useState } from "react";

function Alerts() {
  const role = localStorage.getItem("role");
  const storeId = localStorage.getItem("storeId");
  const assignedShelf = localStorage.getItem("shelfId");

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Mock alert data for demo
    const storeAlerts = [
      { id: 1, storeId: "Store101", shelfId: "ShelfA1", type: "Low Stock", time: "10:20 AM" },
      { id: 2, storeId: "Store101", shelfId: "ShelfA2", type: "Overstock", time: "11:45 AM" },
      { id: 3, storeId: "Store101", shelfId: "ShelfB1", type: "Item Misplaced", time: "9:05 AM" },
    ];

    let filteredAlerts = [];

    if (role === "manager" && storeId) {
      filteredAlerts = storeAlerts.filter(alert => alert.storeId === storeId);
    } else if (role === "staff" && assignedShelf) {
      filteredAlerts = storeAlerts.filter(alert => alert.shelfId === assignedShelf);
    }

    setAlerts(filteredAlerts);
  }, [role, storeId, assignedShelf]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alerts</h1>
      {alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white p-4 rounded shadow">
              <p><strong>Store:</strong> {alert.storeId}</p>
              <p><strong>Shelf:</strong> {alert.shelfId}</p>
              <p><strong>Type:</strong> {alert.type}</p>
              <p><strong>Time:</strong> {alert.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alerts;
