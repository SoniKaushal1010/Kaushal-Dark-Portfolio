import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const empty = { role: "", company: "", duration: "", description: "" };

const ExperienceManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const load = () => API.get("/experience").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/experience/${editId}`, form);
        toast.success("Updated");
      } else {
        await API.post("/experience", form);
        toast.success("Added");
      }
      setForm(empty);
      setEditId(null);
      load();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/experience/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{editId ? "Edit Experience" : "Add Experience"}</h2>
        {["role", "company", "duration", "description"].map((key) => (
          <input key={key} placeholder={key} value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm" />
        ))}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm">
            {editId ? "Update" : "Add"}
          </button>
          {editId && <button type="button" onClick={() => { setForm(empty); setEditId(null); }} className="bg-gray-700 rounded-lg px-4 py-2 text-sm">Cancel</button>}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex justify-between items-start">
            <div>
              <p className="font-semibold">{item.role}</p>
              <p className="text-xs text-gray-400">{item.company} • {item.duration}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => { setForm(item); setEditId(item._id); }} className="text-blue-400">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;