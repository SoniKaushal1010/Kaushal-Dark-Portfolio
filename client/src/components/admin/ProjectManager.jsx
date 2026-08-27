import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const empty = { title: "", description: "", techStack: "", image: "", liveLink: "", githubLink: "" };

const ProjectManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = () => API.get("/projects").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.image;

    if (file) {
      setUploading(true);
      try {
        const data = new FormData();
        data.append("image", file);
        const res = await API.post("/upload", data);
        imageUrl = res.data.url;
      } catch (err) {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const payload = {
      ...form,
      image: imageUrl,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editId) {
        await API.put(`/projects/${editId}`, payload);
        toast.success("Project updated");
      } else {
        await API.post("/projects", payload);
        toast.success("Project created");
      }
      setForm(empty);
      setFile(null);
      setEditId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleEdit = (item) => {
    setForm({ ...item, techStack: item.techStack.join(", ") });
    setFile(null);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      load();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{editId ? "Edit Project" : "Add Project"}</h2>
        {["title", "description", "techStack (comma separated)", "liveLink", "githubLink"].map((f) => {
          const key = f.split(" ")[0];
          return (
            <input
              key={key}
              placeholder={f}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm"
            />
          );
        })}

        <label className="text-sm text-gray-400">Project image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm"
        />
        {form.image && !file && (
          <img src={form.image} alt="current" className="w-32 h-20 object-cover rounded-lg" />
        )}

        <div className="flex gap-2">
          <button type="submit" disabled={uploading} className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm disabled:opacity-50">
            {uploading ? "Uploading..." : editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setForm(empty); setFile(null); setEditId(null); }} className="bg-gray-700 rounded-lg px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex justify-between items-start">
            <div className="flex gap-3">
              {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />}
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-gray-400">{item.techStack.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => handleEdit(item)} className="text-blue-400">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;