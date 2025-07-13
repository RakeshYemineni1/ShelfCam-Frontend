// src/pages/ShelfView.jsx
import { useEffect, useState } from "react";

function ShelfView() {
  const assignedShelfId = localStorage.getItem("shelfId") || "ShelfA1";
  const storeId = localStorage.getItem("storeId") || "Store101";

  const [shelfDetails, setShelfDetails] = useState(null);

  useEffect(() => {
    // Mock shelf data
    const shelves = [
      {
        id: "ShelfA1",
        storeId: "Store101",
        items: [
          { name: "Product A", stock: 12 },
          { name: "Product B", stock: 5 },
        ],
        status: "Normal",
      },
      {
        id: "ShelfA2",
        storeId: "Store101",
        items: [
          { name: "Product C", stock: 2 },
          { name: "Product D", stock: 18 },
        ],
        status: "Low Stock",
      },
    ];

    const shelfData = shelves.find(
      (shelf) => shelf.id === assignedShelfId && shelf.storeId === storeId
    );
    setShelfDetails(shelfData);
  }, [assignedShelfId, storeId]);

  if (!shelfDetails) return <p>Loading shelf data...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shelf View: {shelfDetails.id}</h1>
      <p className="mb-4 text-gray-500">Status: {shelfDetails.status}</p>

      <h2 className="text-xl font-semibold mb-3">Items</h2>
      <ul className="space-y-2">
        {shelfDetails.items.map((item, idx) => (
          <li key={idx} className="bg-white p-4 rounded shadow">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">Stock: {item.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShelfView;
