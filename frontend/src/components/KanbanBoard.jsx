import React from "react";
import FollowUpCard from "./FollowUpCard";

export default function KanbanBoard({ followups, loading, onRefresh, onUpdate, onOpenSnooze }) {
  const pending = followups.filter((f) => f.status === "Pending");
  const snoozed = followups.filter((f) => f.status === "Snoozed");
  const done = followups.filter((f) => f.status === "Done");

  const sortByDate = (arr) =>
    [...arr].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const pendingSorted = sortByDate(pending);
  const snoozedSorted = sortByDate(snoozed);
  const doneSorted = sortByDate(done);

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h4>Pending <span className="badge bg-primary">{pendingSorted.length}</span></h4>

        {pendingSorted.map((item) => (
          <FollowUpCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onOpenSnooze={onOpenSnooze}
          />
        ))}

        {pendingSorted.length === 0 && <p>No Pending Tasks</p>}
      </div>

      <div className="kanban-column">
        <h4>Snoozed <span className="badge bg-warning">{snoozedSorted.length}</span></h4>

        {snoozedSorted.map((item) => (
          <FollowUpCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onOpenSnooze={onOpenSnooze}
          />
        ))}

        {snoozedSorted.length === 0 && <p>No Snoozed Tasks</p>}
      </div>

      <div className="kanban-column">
        <h4>Done <span className="badge bg-success">{doneSorted.length}</span></h4>

        {doneSorted.map((item) => (
          <FollowUpCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
          />
        ))}

        {doneSorted.length === 0 && <p>No Completed Tasks</p>}
      </div>
    </div>
  );
}
