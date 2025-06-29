import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dummyStores = [
  { id: 'Store123', name: 'Walmart delhi', update: "Restocking Done" },
  { id: 'Store456', name: 'Walmart Noida', update: "Store added" },
];

const dummyAlerts = [
  { id: 1, message: "Shelf A2 needs attention", timestamp: "2025-06-24 10:15" },
  { id: 2, message: "Shelf B1 low stock", timestamp: "2025-06-24 12:45" },
];

function Dashboard() {
  const [role, setRole] = useState("");
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    const r = localStorage.getItem("role");
    const s = localStorage.getItem("storeId");

    setRole(r);
    setStoreId(s);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {role === "area-manager" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Store Updates</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {dummyStores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{store.name}</h3>
                <p className="text-gray-500 mb-2">ID: {store.id}</p>
                <p className="text-sm text-green-600">{store.update}</p>
                <Link
                  to={`/store/${store.id}`}
                  className="text-blue-600 hover:underline text-sm mt-2 block"
                >
                  View Store
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {role === "store-manager" && storeId && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Alerts in the Store</h2>
          <ul className="bg-white p-4 rounded-xl shadow space-y-2">
            {dummyAlerts.map((alert) => (
              <li key={alert.id} className="border-b pb-2">
                <p className="text-red-600 font-medium">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
