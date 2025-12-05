import React, { useState } from "react";
import SnoozeModal from "./SnoozeModal";

export default function FollowUpItem({ item, onUpdate }) {
  const [showSnooze, setShowSnooze] = useState(false);

  const markDone = () => onUpdate(item.id, { status: "Done" });
  const reopen = () => onUpdate(item.id, { status: "Pending" });
  const snooze = () => setShowSnooze(true);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5>{item.who}</h5>
        <p className="text-muted">{item.message}</p>

        <span className="badge bg-info me-2">{item.source}</span>
        <span className="badge bg-secondary">{item.priority}</span>

        <div className="mt-3">
          <small className="text-muted">
            Due: {new Date(item.due_date).toLocaleDateString()}
          </small>
        </div>

        <div className="mt-3 d-flex gap-2">
          {item.status !== "Done" && (
            <>
              <button className="btn btn-success btn-sm" onClick={markDone}>
                ✓ Done
              </button>
              <button className="btn btn-warning btn-sm" onClick={snooze}>
                Snooze
              </button>
            </>
          )}

          {item.status === "Done" && (
            <button className="btn btn-primary btn-sm" onClick={reopen}>
              Reopen
            </button>
          )}

          <a
            className="btn btn-outline-success btn-sm"
            href={`https://wa.me/?text=${item.message}`}
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <SnoozeModal
        show={showSnooze}
        onClose={() => setShowSnooze(false)}
        item={item}
        onUpdate={onUpdate}
      />
    </div>
  );
}
