import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [userData, setUserData] = useState({ name: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    const userRef = doc(db, "users", uid);

    try {
      await updateDoc(userRef, {
        name: userData.name,
        role: userData.role,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update: " + err.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="role"
              value={userData.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Save Changes
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Settings;
