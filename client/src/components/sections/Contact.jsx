import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await API.post("/messages", form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to send. Please try again.");
    }
    setSending(false);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <form onSubmit={handleSubmit} className="max-w-md w-full flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-white light:text-gray-900">Contact Me</h2>
        <input
          type="text" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-gray-900 light:bg-gray-50 border border-gray-800 light:border-gray-300 text-white light:text-gray-900 placeholder:text-gray-500 light:placeholder:text-gray-400 rounded-lg px-4 py-2"
          required
        />
        <input
          type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-gray-900 light:bg-gray-50 border border-gray-800 light:border-gray-300 text-white light:text-gray-900 placeholder:text-gray-500 light:placeholder:text-gray-400 rounded-lg px-4 py-2"
          required
        />
        <textarea
          placeholder="Message" value={form.message} rows={5}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="bg-gray-900 light:bg-gray-50 border border-gray-800 light:border-gray-300 text-white light:text-gray-900 placeholder:text-gray-500 light:placeholder:text-gray-400 rounded-lg px-4 py-2"
          required
        />
        <button type="submit" disabled={sending} className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold text-white disabled:opacity-50">
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;