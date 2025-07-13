import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function StoreView() {
  const { id: storeId } = useParams();
  const [store, setStore] = useState(null);
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    // Mock store data
    const storeData = {
      id: storeId,
      name: "Walmart " + storeId?.slice(-3),
    };

    // Mock shelves
    const shelfList = [
      { id: "ShelfA1", status: "Normal" },
      { id: "ShelfA2", status: "Low Stock" },
      { id: "ShelfA3", status: "Overstocked" },
    ];

    setStore(storeData);
    setShelves(shelfList);
  }, [storeId]);

  if (!store) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Loading store data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{store.name}</h1>
      <p className="mb-6 text-gray-600">Store ID: {store.id}</p>

      <h2 className="text-xl font-semibold mb-3">Shelves</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelves.map((shelf) => (
          <div
            key={shelf.id}
            className="p-4 bg-white rounded shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium">{shelf.id}</h3>
            <p className="text-sm text-gray-700 mb-2">Status: {shelf.status}</p>
            <Link
              to={`/store/${storeId}/shelf/${shelf.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View Shelf
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreView;
