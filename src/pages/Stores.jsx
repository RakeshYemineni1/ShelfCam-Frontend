import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Stores() {
  const [stores, setStores] = useState([]);
  const area = localStorage.getItem("area");

  useEffect(() => {
    const allStores = [
      { id: "Store101", name: "Walmart Delhi", area: "North" },
      { id: "Store102", name: "Walmart Noida", area: "City" },
      { id: "Store103", name: "Walmart Delhi South", area: "South" },
    ];

    const filtered = allStores.filter(
      (store) => store.area.toLowerCase() === area?.toLowerCase()
    );
    setStores(filtered);
  }, [area]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stores in {area} Area</h1>
      {stores.length === 0 ? (
        <p>No stores found in your area.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600">ID: {store.id}</p>
              <Link
                to={`/store/${store.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Store
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stores;
