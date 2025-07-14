import { useEffect, useState } from "react";

function Dashboard() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch("http://localhost:8000/inventory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setAlerts(data || []);
            } catch (error) {
                console.error("Error fetching inventory alerts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAlerts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard - Store Inventory Alerts</h1>
            <ul className="bg-white p-4 rounded-xl shadow space-y-2">
                {alerts.map((alert) => (
                    <li key={alert.id} className="border-b pb-2">
                        <p className="font-medium">{alert.product_name} ({alert.product_number})</p>
                        <p className="text-xs text-gray-500">Shelf: {alert.shelf_name}</p>
                        <p className="text-xs text-gray-500">Category: {alert.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
