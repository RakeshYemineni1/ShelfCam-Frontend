// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role")?.toUpperCase();
  const area = localStorage.getItem("area") || "N/A";
  const storeId = localStorage.getItem("storeId") || "N/A";

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for Manager role (inventory alerts)
    if (role === "MANAGER") {
      const mockAlerts = [
        { id: 1, product_name: "Soap", product_number: "A100", shelf_name: "A1", category: "Essentials" },
        { id: 2, product_name: "Rice", product_number: "B200", shelf_name: "B2", category: "Groceries" },
      ];
      setAlerts(mockAlerts);
    }
    setLoading(false);
  }, [role]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {role === "ADMIN" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Area: {area}</h2>
          <p className="text-gray-500">Here you can manage stores, alerts, and reports.</p>
          <Link to="/admin/stores" className="text-blue-600 hover:underline">
            View Stores
          </Link>
        </div>
      )}

      {role === "MANAGER" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Store: {storeId}</h2>
          <h3 className="text-lg">Inventory Alerts:</h3>
          <ul className="bg-white p-4 rounded-xl shadow space-y-2">
            {alerts.length === 0 ? (
              <p>No inventory alerts.</p>
            ) : (
              alerts.map((alert) => (
                <li key={alert.id} className="border-b pb-2">
                  <p className="font-medium">
                    {alert.product_name} ({alert.product_number})
                  </p>
                  <p className="text-xs text-gray-500">Shelf: {alert.shelf_name}</p>
                  <p className="text-xs text-gray-500">Category: {alert.category}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
