import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: auth.currentUser?.uid,
        feedback,
        createdAt: serverTimestamp(),
      });
      setFeedback("");
      alert("Feedback submitted!");
    } catch (error) {
      alert("Error submitting feedback: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
      <h2 className="text-lg font-semibold">Your Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Write your feedback..."
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
