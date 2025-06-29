import { useEffect, useState } from "react";

function Alerts() {
  const role = localStorage.getItem("role");
  const area = localStorage.getItem("area");
  const storeId = localStorage.getItem("storeId");

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Mock alert data
    const allAlerts = [
      { id: 1, storeId: "Store101", shelfId: "ShelfA1", type: "Low Stock", time: "10:20 AM", area: "North" },
      { id: 2, storeId: "Store123", shelfId: "ShelfA2", type: "Overstock", time: "11:45 AM", area: "South" },
      { id: 3, storeId: "Store102", shelfId: "ShelfB1", type: "Item Misplaced", time: "9:05 AM", area: "City" },
    ];

    let filteredAlerts = [];

    if (role === "area-manager" && area) {
      filteredAlerts = allAlerts.filter(alert => alert.area.toLowerCase() === area.toLowerCase());
    } else if (role === "store-manager" && storeId) {
      filteredAlerts = allAlerts.filter(alert => alert.storeId === storeId);
    }

    setAlerts(filteredAlerts);
  }, [role, area, storeId]);

  return (
    <div>
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
