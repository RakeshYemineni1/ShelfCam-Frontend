import { useEffect, useState } from "react";
import { staffAssignmentAPI } from "../services/api";

function ManageWorkers() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shelfId, setShelfId] = useState("");

    useEffect(() => {
        async function fetchAssignments() {
            const res = await staffAssignmentAPI.getCurrentAssignments();
            if (res.success) setAssignments(res.data);
            setLoading(false);
        }
        fetchAssignments();
    }, []);

    async function handleUnassign(employeeId) {
        await staffAssignmentAPI.unassignStaff(employeeId);
        const res = await staffAssignmentAPI.getCurrentAssignments();
        if (res.success) setAssignments(res.data);
    }

    async function handleAssign(employeeId) {
        await staffAssignmentAPI.assignStaff(employeeId, shelfId);
        const res = await staffAssignmentAPI.getCurrentAssignments();
        if (res.success) setAssignments(res.data);
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Workers</h1>
            <div className="space-y-4">
                {assignments.map((a) => (
                    <div key={a.id} className="bg-white p-4 rounded shadow">
                        <p><strong>Employee:</strong> {a.employee_id}</p>
                        <p><strong>Assigned Shelf:</strong> {a.shelf_id || "None"}</p>
                        <div className="mt-2 space-x-2">
                            <button onClick={() => handleUnassign(a.employee_id)} className="bg-red-500 px-3 py-1 text-white rounded">Unassign</button>
                            <input type="text" placeholder="Shelf ID..." className="border p-1" onChange={(e) => setShelfId(e.target.value)} />
                            <button onClick={() => handleAssign(a.employee_id)} className="bg-blue-500 px-3 py-1 text-white rounded">Assign</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageWorkers;
