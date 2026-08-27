import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-sm w-full flex flex-col gap-4 px-6">
        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <input
          type="text" placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
          required
        />
        <input
          type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;