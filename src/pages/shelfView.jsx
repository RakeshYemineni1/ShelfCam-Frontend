import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ShelfView() {
  const { id: storeId, shelfId } = useParams();
  const [shelfData, setShelfData] = useState(null);

  useEffect(() => {
    // Simulate API/data fetch
    const allShelves = {
      ShelfA1: {
        status: "Normal",
        products: ["Toothpaste", "Soap"],
        cameraUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real IP stream or video
      },
      ShelfA2: {
        status: "Low Stock",
        products: ["Shampoo"],
        cameraUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      ShelfA3: {
        status: "Overstocked",
        products: ["Chips", "Soda", "Biscuits"],
        cameraUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    };

    const data = allShelves[shelfId];
    setTimeout(() => {
      setShelfData(data || null);
    }, 500); // simulate fetch delay
  }, [storeId, shelfId]);

  if (!shelfData) return <p>Loading shelf data...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Shelf: {shelfId} ({shelfData.status})
      </h1>
      <p className="text-gray-600 mb-6">Store ID: {storeId}</p>

      {/* Camera Feed */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Live Camera Feed:</h2>
        <video
          controls
          autoPlay
          muted
          className="w-full max-w-xl rounded shadow"
        >
          <source src={shelfData.cameraUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Products */}
      <h2 className="text-lg font-semibold mb-2">Products on Shelf:</h2>
      {shelfData.products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {shelfData.products.map((product, index) => (
            <li key={index} className="text-gray-800">{product}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShelfView;
