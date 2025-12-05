import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function FollowUpForm({ onAdded }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    who: "",
    message: "",
    source: "Call",
    priority: "Medium",
    due_date: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await fetch(`${API_BASE}/followups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShow(false);
    onAdded();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        + Add Follow-Up
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Follow-Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="who" onChange={update} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" onChange={update} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Source</Form.Label>
              <Form.Select name="source" onChange={update}>
                <option>Call</option>
                <option>WhatsApp</option>
                <option>Verbal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Priority</Form.Label>
              <Form.Select name="priority" onChange={update}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due_date" onChange={update} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
