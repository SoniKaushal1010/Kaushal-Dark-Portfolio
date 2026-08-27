import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const SkillManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });

  const load = () => API.get("/skills").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/skills", form);
      toast.success("Skill added");
      setForm({ name: "", category: "" });
      load();
    } catch (err) {
      toast.error("Failed to add");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/skills/${id}`);
    toast.success("Skill deleted");
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Add Skill</h2>
        <input placeholder="Name (e.g. React)" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm" required />
        <input placeholder="Category (optional)" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm">Add</button>
      </form>

      <div className="flex flex-wrap gap-2 content-start">
        {items.map((item) => (
          <span key={item._id} className="bg-gray-900 border border-gray-800 rounded-full px-3 py-1 text-sm flex items-center gap-2">
            {item.name}
            <button onClick={() => handleDelete(item._id)} className="text-red-400">×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;