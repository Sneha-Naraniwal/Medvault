// src/components/common/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MedContext } from "../../context/MedContext";
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

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(MedContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login attempt with:", email, password);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response status:", res.status, "data:", data);

      if (res.ok) {
        setToken(data.token);
        setUser(data.user); // user object with role, name, etc
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Network error during login:", err);
      setError("Unable to reach server. Please try again later.");
    }
  };

  return (
    <div style={formPageStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h2 style={{ fontWeight: 900, fontSize: 28, color: "#2563eb", marginBottom: 10 }}>
          Login
        </h2>

        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button style={submitStyle} type="submit">
          Login
        </button>

        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </div>
  );
}
