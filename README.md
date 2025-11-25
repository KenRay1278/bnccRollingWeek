# 🛠️ How to Run Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the server:
    ```bash
    npm start
    ```

> The Backend server runs on the default port: **http://localhost:3000**

---

## 🔗 API Endpoints

### Feedback API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/feedback` | Retrieve all feedback entries. |
| `POST` | `/api/feedback` | Create a new feedback entry. |
| `PUT` | `/api/feedback/:id` | Update a specific feedback entry. |
| `DELETE` | `/api/feedback/:id` | Delete a specific feedback entry. |
