import { useEffect, useState } from "react";

function ManageWorkers() {
  const storeId = localStorage.getItem("storeId");
  const [workers, setWorkers] = useState([]);
  const [newWorkerId, setNewWorkerId] = useState("");
  const [newShelfId, setNewShelfId] = useState("");

  useEffect(() => {
    // Load existing workers from localStorage or mock data
    const stored = JSON.parse(localStorage.getItem("workers")) || [
      { id: "W0001", storeId: "Store123", shelfId: "ShelfA1" },
      { id: "W0002", storeId: "Store123", shelfId: "ShelfA2" },
    ];

    const filtered = stored.filter((worker) => worker.storeId === storeId);
    setWorkers(filtered);
  }, [storeId]);

  const assignWorker = () => {
    if (!newWorkerId || !newShelfId) return alert("Enter both fields.");

    const updated = [...workers, { id: newWorkerId, storeId, shelfId: newShelfId }];
    setWorkers(updated);
    localStorage.setItem("workers", JSON.stringify(updated));
    setNewWorkerId("");
    setNewShelfId("");
  };

  const removeWorker = (idToRemove) => {
    const updated = workers.filter((worker) => worker.id !== idToRemove);
    setWorkers(updated);
    localStorage.setItem("workers", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Workers</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Assign New Worker</h2>
        <input
          type="text"
          placeholder="Worker ID"
          value={newWorkerId}
          onChange={(e) => setNewWorkerId(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Shelf ID"
          value={newShelfId}
          onChange={(e) => setNewShelfId(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={assignWorker}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Current Workers</h2>
      {workers.length === 0 ? (
        <p>No workers assigned to this store.</p>
      ) : (
        <ul className="space-y-2">
          {workers.map((worker) => (
            <li
              key={worker.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>
                <strong>{worker.id}</strong> – Shelf: {worker.shelfId}
              </span>
              <button
                onClick={() => removeWorker(worker.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageWorkers;
