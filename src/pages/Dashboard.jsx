import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  // Dummy stats
  const dummyStats = {
    total: 5,
    solved: 2,
    inProgress: 1,
    awaiting: 2,
  };

  const [liveStats, setLiveStats] = useState({
    total: 0,
    solved: 0,
    inProgress: 0,
    awaiting: 0,
  });

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "tickets"), where("uid", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tickets = snapshot.docs.map((doc) => doc.data());

      const statusCounts = {
        total: tickets.length,
        solved: tickets.filter((t) => t.status === "Closed").length,
        inProgress: tickets.filter((t) => t.status === "In Progress").length,
        awaiting: tickets.filter((t) => t.status === "Awaiting Approval").length,
      };

      setLiveStats(statusCounts);
    });

    // ✅ Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  // Combine dummy and live stats
  const combined = {
    total: dummyStats.total + liveStats.total,
    solved: dummyStats.solved + liveStats.solved,
    inProgress: dummyStats.inProgress + liveStats.inProgress,
    awaiting: dummyStats.awaiting + liveStats.awaiting,
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value={combined.total} color="bg-blue-100 text-blue-800" />
        <StatCard title="Solved Tickets" value={combined.solved} color="bg-green-100 text-green-800" />
        <StatCard title="In Progress" value={combined.inProgress} color="bg-yellow-100 text-yellow-800" />
        <StatCard title="Awaiting Approval" value={combined.awaiting} color="bg-orange-100 text-orange-800" />
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-6 rounded-xl shadow-md ${color}`}>
    <h3 className="text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
