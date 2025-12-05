# FollowUp Boss — Full Stack Project

A simple and efficient follow-up management system built using **React (Vite)**, **Bootstrap**, **Node.js**, **Express**, and **MySQL**. The UI supports a **Kanban-style workflow** (Pending → Snoozed → Done) with button-based status updates and a clean modal system.

---

## 🚀 Setup Instructions

### **1. Clone the project**

bash
cd C:/react/
git clone followup-boss


### **2. Setup Backend**

bash
cd followup-boss/backend
npm install


Create a `.env` file:

env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=followup_boss
PORT=5000


Start backend:

bash
npm start


Backend will run at:


http://localhost:5000


---

### **3. Setup Frontend**

bash
cd ../frontend
npm install


Install Bootstrap:

bash
npm install react-bootstrap bootstrap


Ensure `main.jsx` imports Bootstrap:

jsx
import 'bootstrap/dist/css/bootstrap.min.css';


Start frontend:

bash
npm run dev


Frontend will run at:


http://localhost:5173


---

## 📂 Folder Structure


followup-boss/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   └── components/
│   │       ├── FollowUpForm.jsx
│   │       ├── FollowUpItem.jsx
│   │       ├── FollowUpList.jsx
│   │       ├── KanbanBoard.jsx
│   │       └── SnoozeModal.jsx
│   ├── public/
│   ├── index.html
│   └── package.json




## 🧠 What Decisions Were Made
### ✔ 1. **Bootstrap Instead of Custom UI**

Using **react-bootstrap** improves:

* Modals
* Buttons
* Forms
* Responsive design

---

### ✔ 2. **Three-Column Kanban Structure**

* Pending
* Snoozed
* Done

Simple and effective for managing follow-ups.

---

### ✔ 3. **REST API with Clean Endpoints**

CRUD operations via `/api/followups` using Express + MySQL.

Easier to integrate with future mobile app.

---

### ✔ 4. **WhatsApp Integration**

Each follow-up includes:


wa.me/?text=<prefilled reminder>


One-click to send reminders.

---

## ⚠️ What Was Skipped (For Now)

### ❌ 1. **Role-Based Access Control (RBAC)**

* Managers vs Salesperson view
* Requires authentication system

Planned for future phase.

---

### ❌ 2. **Audio Notes / Voice Recording**

Useful but requires:

* File uploads
* Storage system (AWS S3 / Local disk)

Skipped to keep MVP simple.

---

### ❌ 3. **Missed Call Auto-Tracking**

Simulated data could be created, but real call monitoring requires:

* Telephony API
* External services

---

### ❌ 4. **Advanced Filters / Search / Sorting**

Not required for MVP but part of planned improvements.

---

## 📌 Roadmap (Future Enhancements)

### ⭐ Phase 2 Improvements

* Search bar (name, message, source)
* Priority filter
* Due-date sorting
* Pagination
* Column count summary

### ⭐ Phase 3 Bonus Features

* Voice note recording
* WhatsApp reminder scheduling
* Missed call mock generator
* Role-based access (Manager, Agent)


