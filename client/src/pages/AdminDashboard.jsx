import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import EducationManager from "../components/admin/EducationManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tabs = ["Projects", "Skills", "Education", "Experience"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Projects");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-sm">
          Logout
        </button>
      </header>

      <div className="flex gap-2 px-6 py-4 border-b border-gray-800 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeTab === tab ? "bg-blue-600" : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Projects" && <ProjectManager />}
        {activeTab === "Skills" && <SkillManager />}
        {activeTab === "Education" && <EducationManager />}
        {activeTab === "Experience" && <ExperienceManager />}
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default AdminDashboard;