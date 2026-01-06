import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./routes/PublicRoute";

// Pages
import StudentRegister from "./pages/StudentRegister";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <FormProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Navbar />

        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/student-register" replace />} />

          {/* Public Routes */}
          <Route path="/student-register" element={<StudentRegister />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

      </Router>
    </FormProvider>
  );
}

export default App;
