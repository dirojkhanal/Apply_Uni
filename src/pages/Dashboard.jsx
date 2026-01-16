import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const studentData = sessionStorage.getItem("student");
    const userStatus = sessionStorage.getItem("status");

    if (!token || !studentData) {
      navigate("/login");
      return;
    }

    setStudent(JSON.parse(studentData));
    setStatus(userStatus);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  if (!student) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        {/* Avatar */}
        <div className="avatar-wrapper">
          <img
            src={
              student.photo
                ? `${import.meta.env.VITE_API_URL}/storage/${student.photo}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="profile-avatar"
          />
        </div>

        {/* Name */}
        <h2 className="student-name">
          {student.firstName} {student.lastName}
        </h2>

        {/* Status */}
        <span
          className={`status-badge ${
            status === "approved" ? "approved" : "pending"
          }`}
        >
          {status?.toUpperCase()}
        </span>

        {/* Student Details */}
        <div className="student-grid">
          <div className="grid-item">
            <span>Email</span>
            <p>{student.email || "-"}</p>
          </div>

          <div className="grid-item">
            <span>Nationality</span>
            <p>{student.nationality || "-"}</p>
          </div>

          <div className="grid-item">
            <span>Country</span>
            <p>{student.country || "Nepal"}</p>
          </div>

          <div className="grid-item">
            <span>Country Code</span>
            <p>{student.countrycode || "-"}</p>
          </div>

          <div className="grid-item">
            <span>Phone Number</span>
            <p>{student.contactnumber || "-"}</p>
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
