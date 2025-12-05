import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import FollowUpForm from "./components/FollowUpForm";
import SnoozeModal from "./components/SnoozeModal";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function App() {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Snooze modal state
  const [showSnooze, setShowSnooze] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/followups`);
      const data = await res.json();
      setFollowups(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const updateFollowup = async (id, patch) => {
    const res = await fetch(`${API_BASE}/followups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    const updated = await res.json();

    setFollowups((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  const openSnooze = (item) => {
    setActiveItem(item);
    setShowSnooze(true);
  };

  const closeSnooze = () => {
    setShowSnooze(false);
    setActiveItem(null);
  };

  const confirmSnooze = async (date) => {
    await updateFollowup(activeItem.id, {
      status: "Snoozed",
      snoozed_till: date,
    });
    closeSnooze();
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>FollowUp Boss</h2>
        <FollowUpForm onAdded={fetchAll} />
      </div>

      <KanbanBoard
        followups={followups}
        loading={loading}
        onRefresh={fetchAll}
        onUpdate={updateFollowup}
        onOpenSnooze={openSnooze}
      />

      <SnoozeModal
        show={showSnooze}
        onClose={closeSnooze}
        item={activeItem}
        onConfirm={confirmSnooze}
      />
    </div>
  );
}
