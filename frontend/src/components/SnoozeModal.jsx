import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function SnoozeModal({ show, onClose, item, onConfirm }) {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      setDate("");
      setError("");
    }
  }, [show]);

  if (!item) return null;

  const submit = () => {
    if (!date) {
      setError("Please select a snooze date.");
      return;
    }
    onConfirm(date);
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Snooze Follow-Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>{item.who}</strong></p>
        <p className="text-muted small">{item.message}</p>

        <Form.Group>
          <Form.Label>Snoozed Till</Form.Label>
          <Form.Control
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(e.target.value);
              setError("");
            }}
          />
        </Form.Group>

        {error && <p className="text-danger mt-2 small">{error}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="warning" onClick={submit}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
