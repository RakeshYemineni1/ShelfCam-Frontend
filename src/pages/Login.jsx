import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = {
            A0001: { role: 'area-manager', area: 'South' },
            S0123: { role: 'store-manager', storeId: 'Store123' },
            W0007: { role: 'worker', storeId: 'Store123', shelfId: 'ShelfA2' },
        };

        const user = users[id];

        if (!user || user.role !== role) {
            alert("Invalid Login, Please enter valid credentials");
            return;
        }

        localStorage.setItem("role", user.role);
        localStorage.setItem("employeeId", id);
        if (user.storeId) localStorage.setItem("storeId", user.storeId);
        if (user.shelfId) localStorage.setItem("shelfId", user.shelfId);
        if (user.area) localStorage.setItem("area", user.area); // ✅ Important for area manager

        if (role === 'area-manager') {
            navigate('/dashboard');
        } else if (role === 'store-manager') {
            navigate('/dashboard');
        } else if (role === 'worker') {
            navigate(`store/${user.storeId}/shelf/${user.shelfId}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <input
                    type="text"
                    placeholder="Employee ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                >
                    <option value="">Select Role</option>
                    <option value="area-manager">Area Manager</option>
                    <option value="store-manager">Store Manager</option>
                    <option value="worker">Worker</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
