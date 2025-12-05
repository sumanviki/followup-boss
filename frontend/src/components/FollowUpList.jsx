import React from "react";
import FollowUpItem from "./FollowUpItem";

export default function FollowUpList({ title, items, onUpdate }) {
  return (
    <div className="col-md-4">
      <h4 className="mb-3">{title}</h4>

      {items.length === 0 && (
        <p className="text-muted">No items</p>
      )}

      {items.map((f) => (
        <FollowUpItem key={f.id} item={f} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
