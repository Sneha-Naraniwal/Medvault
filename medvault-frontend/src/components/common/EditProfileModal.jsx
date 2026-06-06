// src/components/common/EditProfileModal.jsx
import React, { useState, useContext } from "react";
import { MedContext } from "../../context/MedContext";

const overlay = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(20,30,60,0.12)", zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center",
};
const modal = {
  background: "#fff", borderRadius: 14, minWidth: 360, padding: 36,
  boxShadow: "0 2px 10px 0 rgb(16 30 54 / 17%)",
  minHeight: 230, maxWidth: 400, zIndex: 120,
};
const inputField = {
  width: "100%",
  padding: "9px 14px",
  borderRadius: "6px",
  border: "1.2px solid #cbd0da",
  fontSize: 16,
  marginTop: 5,
  marginBottom: 14,
  outline: "none",
  boxSizing: "border-box"
};

export default function EditProfileModal({ onClose }) {
  const { user, token, setUser } = useContext(MedContext);
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "vendor",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5500/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        onClose();
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Update failed");
    }
    setSaving(false);
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 20, color: "#2563eb" }}>
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label style={{ fontWeight: 600 }}>Name</label>
          <input
            style={inputField}
            name="name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <label style={{ fontWeight: 600 }}>Email</label>
          <input
            style={inputField}
            name="email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <label style={{ fontWeight: 600 }}>Role</label>
          <select
            style={inputField}
            name="role"
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
          >
            <option value="agency">Agency</option>
            <option value="vendor">Vendor</option>
          </select>
          {error && <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 14
          }}>
            <button
              type="button"
              style={{
                background: "#fff",
                border: "1.5px solid #d1d5db",
                borderRadius: 6,
                color: "#222",
                padding: "9px 22px",
                fontWeight: 700
              }}
              onClick={onClose}
            >Cancel</button>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: 0,
                borderRadius: 8,
                fontWeight: 700,
                padding: "9px 22px",
                fontSize: 16,
                opacity: saving ? 0.7 : 1
              }}
            >{saving ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
