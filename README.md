# MERN Stack User Management Application

## Overview

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing users. It allows users to perform CRUD (Create, Read, Update, Delete) operations through a user-friendly interface and a REST API.

## Features

- Add, update, delete, and view user details.
- User details include name, country, company, and custom questions.
- Paginated user listing for better scalability.
- Backend APIs built with Express.js and connected to a MongoDB database.
- Frontend styled with Bootstrap for responsiveness.

## Folder Structure

```
project-directory/
├── backend/
│   ├── models/
│   │   └── Users.js
│   ├── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Users.jsx
│   │   │   ├── CreateUser.jsx
│   │   │   ├── UpdateUser.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── App.css
│   ├── public/
├── package.json (frontend)
├── package.json (backend)
```

## Design Choices

1. **Frontend:**

   - **React Router DOM** for routing between different views (list, create, update).
   - **Bootstrap** for responsive UI design.
   - **Axios** for HTTP requests to the backend.

2. **Backend:**

   - **Express.js** as the web framework for building REST APIs.
   - **MongoDB** as the database for storing user data.
   - **Mongoose** as the ODM for schema management.

3. **State Management:**

   - Managed locally within components using React's `useState` and `useEffect` hooks.

4. **Pagination:**

   - Logic for paginated user listing implemented using array slicing in the frontend.

## Prerequisites

- Node.js and npm installed on your system.
- MongoDB installed and running locally.
- Basic understanding of JavaScript, React, and REST APIs.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/notinrange/Interview-Questions.git
cd project-directory
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure MongoDB

Ensure MongoDB is running locally and accessible at `mongodb://127.0.0.1:27017/interview`. If needed, update the connection string in `index.js`.

#### Start the Backend Server

```bash
nodemon index.js
```

The backend server will start at `http://localhost:3001`.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

#### Start the Frontend Server

```bash
npm run dev
```

The frontend server will start at `http://localhost:5173`.

## API Endpoints

- `GET /`: Fetch all users.
- `POST /createUser`: Create a new user.
- `PUT /updateUser/:id`: Update a user by ID.
- `DELETE /deleteUser/:id`: Delete a user by ID.

## Usage

1. Visit `http://localhost:3000` to view the user list.
2. Use the "Add User" button to create a new user.
3. Click "Update" to modify user details.
4. Click "Delete" to remove a user from the database.

## Dependencies

### Frontend

- `react`
- `react-router-dom`
- `axios`
- `bootstrap`

### Backend

- `express`
- `mongoose`
- `cors`
- `uuid`

## Future Enhancements

- Implement user authentication and authorization with jwt.
- Add server-side pagination.
- Introduce advanced error handling.
- Deploy the application to cloud platforms.

## License

This project is licensed under the MIT License.

