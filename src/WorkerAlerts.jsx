import { useEffect, useState } from "react";

function WorkerAlerts() {
  const [alerts, setAlerts] = useState([]);
  const shelfId = localStorage.getItem("shelfId");

  useEffect(() => {
    // Mocked alert data — in a real app, fetch this from the backend
    const allAlerts = [
      { id: 1, message: "Restock needed", shelfId: "ShelfA2", timestamp: "2025-06-24 10:00 AM" },
      { id: 2, message: "Item misplaced", shelfId: "ShelfB1", timestamp: "2025-06-24 11:30 AM" },
      { id: 3, message: "Cleaning required", shelfId: "ShelfA2", timestamp: "2025-06-25 09:45 AM" },
    ];

    // Filter alerts for the worker's shelf
    const filtered = allAlerts.filter(alert => alert.shelfId === shelfId);
    setAlerts(filtered);
  }, [shelfId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Shelf Alerts</h1>
      {alerts.length === 0 ? (
        <p>No alerts for your shelf.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map(alert => (
            <li key={alert.id} className="bg-white p-4 rounded shadow">
              <p className="text-lg font-semibold">{alert.message}</p>
              <p className="text-sm text-gray-500">Shelf: {alert.shelfId}</p>
              <p className="text-sm text-gray-400">Time: {alert.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkerAlerts;
