
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // use promise API

const app = express();
app.use(cors());
app.use(express.json());

// read env or defaults
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'followup_boss',
  DB_PORT = 3306,
  PORT = 5000,
} = process.env;

let pool;
async function initDb() {
  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
initDb().then(() => console.log('MySQL pool created')).catch((err) => {
  console.error('DB init error:', err);
  process.exit(1);
});

// helper to query
async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// GET all followups
app.get('/api/followups', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM followups ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch followups' });
  }
});

// POST create followup
app.post('/api/followups', async (req, res) => {
  try {
    const { source, who, message, due_date, priority } = req.body;
    if (!who || !message) return res.status(400).json({ error: 'who and message required' });

    const sql = `INSERT INTO followups (source, who, message, due_date, priority, status) VALUES (?, ?, ?, ?, ?, 'Pending')`;
    const params = [source || 'Call', who, message, due_date || null, priority || 'Medium'];
    const result = await query(sql, params);
    const inserted = (await query('SELECT * FROM followups WHERE id = ?', [result.insertId]))[0];
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create followup' });
  }
});

// PUT update followup
app.put('/api/followups/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, snoozed_till, who, message, due_date, priority, source } = req.body;

    // Snooze validation: if status is Snoozed, snoozed_till required
    if (status === 'Snoozed' && !snoozed_till) {
      return res.status(400).json({ error: 'Snoozed Till date is required when snoozing.' });
    }

    // Build dynamic update
    const fields = [];
    const values = [];

    if (status) {
      fields.push('status = ?');
      values.push(status);
    }
    if (snoozed_till !== undefined) {
      // allow setting null explicitly if provided as null
      fields.push('snoozed_till = ?');
      values.push(snoozed_till || null);
    }
    if (who !== undefined) {
      fields.push('who = ?'); values.push(who);
    }
    if (message !== undefined) {
      fields.push('message = ?'); values.push(message);
    }
    if (due_date !== undefined) {
      fields.push('due_date = ?'); values.push(due_date || null);
    }
    if (priority !== undefined) {
      fields.push('priority = ?'); values.push(priority);
    }
    if (source !== undefined) {
      fields.push('source = ?'); values.push(source);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const sql = `UPDATE followups SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);

    const updated = (await query('SELECT * FROM followups WHERE id = ?', [id]))[0];
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// optional: delete
app.delete('/api/followups/:id', async (req, res) => {
  try {
    await query('DELETE FROM followups WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
