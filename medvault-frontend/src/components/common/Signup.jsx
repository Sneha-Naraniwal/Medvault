// src/components/common/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";

const formPageStyle = {
  minHeight: "calc(100vh - 64px)",
  background: "#f7fafd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const cardStyle = {
  background: "#fff",
  borderRadius: 14,
  padding: 36,
  boxShadow: "0 2px 10px 0 rgb(16 30 54 / 8%)",
  minWidth: 320,
  maxWidth: 380,
};
const labelStyle = {
  display: "block",
  marginTop: 20,
  marginBottom: 6,
  fontWeight: 600,
  color: "#1c254b",
};
const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 7,
  border: "1.5px solid #d1d5db",
  fontSize: 16,
  outline: "none",
};
const submitStyle = {
  width: "100%",
  padding: "13px",
  background: "#2563eb",
  border: 0,
  color: "#fff",
  fontWeight: 900,
  borderRadius: 8,
  marginTop: 28,
  fontSize: "1.1rem",
  letterSpacing: 1,
  cursor: "pointer",
};
const errorStyle = {
  color: "#ef4444",
  marginTop: 16,
  textAlign: "center",
};

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!role) { setError("Please select a user role"); return; }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1300);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div style={formPageStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h2
          style={{
            fontWeight: 900,
            fontSize: 28,
            color: "#2563eb",
            marginBottom: 10,
          }}
        >
          Signup
        </h2>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Full name"
        />
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email@example.com"
        />
        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your password"
        />
        <label style={labelStyle}>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="agency">Agency</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit" style={submitStyle}>
          Create Account
        </button>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 16, textAlign: "center" }}>{success}</div>}
      </form>
    </div>
  );
}
