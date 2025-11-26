# BNCC Internal Event Feedback System

A full-stack simple web application designed to collect, manage, and track feedback for BNCC events. This system allows users to submit ratings and comments, while enabling future administrators to review, update statuses, and manage feedback entries.

## 🚀 Features

* **Submit Feedback:** Users can submit detailed feedback, including ratings, comments, and suggestions.
* **Admin Dashboard:** View all feedback in a list format.
* **Filtering:** Filter feedback by Event Name, Status (Open, In Review, Resolved), or Division.
* **CRUD Operations:** Fully functional Create, Read, Update, and Delete operations connected to a backend API.

## 🛠️ Tech Stack

### Frontend
* **HTML:** Structure and layout.
* **CSS:** Custom styling (separated in `style.css`).
* **Vanilla JavaScript:** Client-side logic, DOM manipulation, and API fetching (separated in `script.js`).

### Backend
* **Node.js:** Runtime environment.
* **Express.js:** Web server framework.
* **CORS:** Middleware to handle cross-origin requests.
* **File System (fs):** JSON-based data persistence (simulating a database).

## 📂 Project Structure

```text
root/
│
├── backend/                      # Backend Server Logic
│   ├── src/
│   │   ├── controllers/          # Logic for handling requests
│   │   ├── data/                 # JSON file storage (database)
│   │   ├── routes/               # API Route definitions
│   │   └── index.js              # Entry point (Server setup)
│   └── package.json              # Backend dependencies
│
└── frontend/
    ├── bncc_feedback_system.html # Main Frontend Interface
    ├── style.css                 # Frontend Styles
    └── script.js                 # Frontend Logic & API calls
```

## ⚙️ Installation & Setup

### 1. Prerequisites

Have **Node.js** installed on your computer. Verify by running:

```bash
node -v
```

### 2. Setting up the Backend

1.  Open your terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    * *Alternative (if nodemon is installed):* `npm run start:dev`
    * You should see: `Running on Port 3000`

### 3. Running the Frontend

Since this uses vanilla HTML/JS, no build process is required.

1.  Simply locate the `bncc_feedback_system.html` file in your file explorer.
2.  Double-click to open it in your default web browser (Chrome, Edge, Firefox, etc.).
3.  Ensure the backend is still running in your terminal background.

## 📡 API Endpoints

The backend runs on `http://localhost:3000/api/feedback`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Retrieve all feedback entries. |
| `POST` | `/` | Create a new feedback entry. |
| `PUT` | `/:id` | Update an existing feedback entry by ID. |
| `DELETE` | `/:id` | Delete a feedback entry by ID. |

## 🐛 Troubleshooting

* **Error: "Gagal mengambil data"**
    * Ensure your backend terminal is open and running.
    * Check if the port is correct (`3000`).
    
* **CORS Error in Console**
    * Ensure you have installed `cors` in the backend (`npm install cors`).

* **Changes not showing?**
    * Hard refresh your browser (`Ctrl + F5` or `Cmd + Shift + R`) to clear the cache.

## 📝 License

This project was created for the Rolling Week Quest.
