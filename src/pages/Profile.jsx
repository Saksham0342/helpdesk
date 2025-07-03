import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Feedback from "./Feedback"; // ⬅️ Adjust path if needed

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUser(userData);
        setEditForm({
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "",
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      await updateDoc(doc(db, "users", uid), {
        name: editForm.name,
        email: editForm.email,
        role: editForm.role,
      });
      setUser(editForm);
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  if (loading) return <div className="ml-64 p-6">Loading...</div>;
  if (!user) {
  return <div className="ml-64 p-6">Loading profile...</div>;
}

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>

        {/* 👤 View-Only Profile Section */}
        
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        {/* ✏️ Edit Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Email"
            />
            <input
              type="text"
              name="role"
              value={editForm.role}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Role"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* 💬 Feedback Section (Now Separated) */}
        <Feedback />
      </main>
    </div>
  );
};

export default Profile;
