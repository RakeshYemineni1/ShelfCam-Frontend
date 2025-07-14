import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../services/api";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, password } = formData;
    const result = await authAPI.login({ username, password });

    if (!result.success) {
      setError(result.error);
      return;
    }

    const token = result.token;
    const decoded = jwtDecode(token);
    const role = decoded.role || "";
    const employeeId = decoded.sub || "";

    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", role === "store_manager" ? "store-manager" : role);
    localStorage.setItem("employeeId", employeeId);

    if (role === "store_manager") {
      localStorage.setItem("storeId", "Store101"); // or fetch dynamically if needed
      navigate("/manager/dashboard");
    } else if (role === "staff") {
      navigate("/staff/shelf");
    } else {
      setError("Invalid role");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6">ShelfCam Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
