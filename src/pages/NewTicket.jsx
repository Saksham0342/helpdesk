import { useState } from "react";
import Layout from "../components/Layout";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NewTicket = () => {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    department: "",
    priority: "Low",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "tickets"), {
        ...form,
        uid: auth.currentUser?.uid,
        status: "Open",
        createdAt: serverTimestamp(),
      });

      alert("Ticket created successfully!");
      setForm({ subject: "", description: "", department: "", priority: "Low" });
    } catch (err) {
      alert("Error creating ticket: " + err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">New Ticket</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl">
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </Layout>
  );
};

export default NewTicket;
