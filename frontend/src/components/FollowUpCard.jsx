import React from "react";

export default function FollowUpCard({ item, onUpdate, onOpenSnooze }) {
  const today = new Date().toISOString().split("T")[0];
  const dueDate = item.due_date ? new Date(item.due_date) : null;
  const snoozeDate = item.snoozed_till ? new Date(item.snoozed_till) : null;

  // STATUS COLORS
  const statusColor = {
    Pending: "bg-primary",
    Snoozed: "bg-warning",
    Done: "bg-success",
  };

  // COUNTDOWN LABELS
  const getCountdownLabel = () => {
    const date = snoozeDate || dueDate;
    if (!date) return null;

    const diffDays = Math.ceil(
      (date - new Date(today)) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "⚠ Overdue";
    if (diffDays === 0) return "📌 Today";
    if (diffDays === 1) return "🕒 Tomorrow";
    if (diffDays <= 3) return `⏳ In ${diffDays} days`;

    return null;
  };

  const countdown = getCountdownLabel();

  // Highlight overdue or expiring soon
  const highlightClass =
    countdown === "⚠ Overdue"
      ? "overdue-card"
      : countdown && countdown.includes("In")
      ? "soon-card"
      : "";

  // BUTTON ACTIONS
  const handleDone = () => {
    onUpdate(item.id, { status: "Done", snoozed_till: null });
  };

  const handleReopen = () => {
    onUpdate(item.id, { status: "Pending", snoozed_till: null });
  };

  return (
    <div className={`follow-card ${highlightClass}`}>
      <div className="d-flex justify-content-between">
        <strong>{item.who}</strong>

        <span className={`badge ${statusColor[item.status]}`}>
          {item.status}
        </span>
      </div>

      <p className="text-muted small mb-1">{item.message}</p>

      {/* Due Date */}
      {item.due_date && (
        <div className="small">
          <strong>Due:</strong> {item.due_date}
        </div>
      )}

      {/* Snoozed till */}
      {item.snoozed_till && (
        <div className="small text-warning">
          Snoozed Till: {item.snoozed_till}
        </div>
      )}

      {/* Countdown */}
      {countdown && (
        <div className="small mt-1 fw-bold text-danger">{countdown}</div>
      )}

      {/* ACTION BUTTONS */}
      <div className="d-flex gap-2 mt-3">

        {/* Pending → Done + Snooze */}
        {item.status === "Pending" && (
          <>
            <button className="btn btn-success btn-sm" onClick={handleDone}>
              Done
            </button>

            <button
              className="btn btn-warning btn-sm"
              onClick={() => onOpenSnooze(item)}
            >
              Snooze
            </button>
          </>
        )}

        {/* Snoozed → Done only */}
        {item.status === "Snoozed" && (
          <button className="btn btn-success btn-sm" onClick={handleDone}>
            Done
          </button>
        )}

        {/* Done → Reopen */}
        {item.status === "Done" && (
          <button className="btn btn-primary btn-sm" onClick={handleReopen}>
            Reopen
          </button>
        )}
      </div>
    </div>
  );
}
