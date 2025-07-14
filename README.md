# 🐞 MERN Bug Tracker

A full-stack Bug Tracker app built with the MERN stack. Users can report, track, update, and resolve bugs. Admins can manage all bugs and users. The app supports dark mode, search, filtering, role-based access, and testing.

---

## 🚀 Features

### 👥 User Functionality
- Register/Login with JWT Authentication
- Report new bugs
- View & filter bug reports
- Update bug status (`open` → `in-progress` → `resolved`)
- View personal bug list in Profile
- Toggle dark mode

### 🛠️ Admin Features
- View all users
- Delete any bug
- Access admin dashboard
- Route-level protection (admin only)

### 🔎 UI Enhancements
- Search & filter bugs by status
- Sort by date or status
- Paginated bug list
- Export bug reports to CSV
- Toast notifications
- Responsive & accessible UI (Tailwind + Dark mode)

---

## 🧱 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS  
- **Backend**: Express.js + Node.js + MongoDB (Mongoose)  
- **Authentication**: JWT (with token refresh and auto logout)  
- **Testing**: Jest + Supertest (backend), React Testing Library (frontend)

---

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/solomon-mash/mern-bug-tracker.git
cd mern-bug-tracker
```

### 2. Backend Setup(/server)

```
cd server
npm install
```

### 3.  Create a .env File 
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bugtracker
JWT_SECRET=your_jwt_secret
```
### 4. Run the following command to start a server
```
node server.js
```
### 5. Frontend Setup (/client)
```
cd client
npm install
npm run dev
```
## 6. ✅ Testing
## Backend Tests (Jest + Supertest)
```
cd server
npm test
```
#### Test Covers
```
Auth (JWT middleware)
Bug routes: create, update, delete
Admin-only access checks
MongoDB calls mocked

```
## Frontend Tests (React Testing Library + Jest)
```
cd client
npm test
```
#### Test Covers
```
Login/Register flow
BugForm submission
UI state tests (empty, loading, errors)
Component interactions (status updates, filtering, pagination)
```
## 🧪 Debugging Tools Used
- console.log, browser DevTools for frontend inspection
- Node.js --inspect for backend debugging
- React Error Boundaries
- Network tab for API inspection
- Supertest for route-level testing

## Folder Structure
```
mern-bug-tracker/
├── client/               # React Frontend
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── ...
├── server/               # Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── models/
└── README.md
```
## 🔐 Role-Based Access
- Users can only update their bugs
- Admin can delete any bug
- Route protection enforced on both frontend and backend



