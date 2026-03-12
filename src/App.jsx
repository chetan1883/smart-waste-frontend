import React from "react";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import CreateComplaint from "./pages/CreateComplaint";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Dashboard from "./pages/Dashboard";

function App() {

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Citizen Routes */}

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/report"
          element={token ? <Report /> : <Navigate to="/login" />}
        />

        <Route
          path="/create-complaint"
          element={token ? <CreateComplaint /> : <Navigate to="/login" />}
        />

        {/* Admin Route */}

        <Route
          path="/admin"
          element={
            token && role === "admin"
              ? <Admin />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;