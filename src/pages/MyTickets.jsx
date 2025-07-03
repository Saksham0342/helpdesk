import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TicketTable from "../components/TicketTable";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "tickets"), where("uid", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveTickets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A",
      }));
      setTickets(liveTickets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
      <TicketTable data={tickets} />
    </Layout>
  );
};

export default MyTickets;
