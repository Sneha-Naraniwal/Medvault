// src/components/common/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MedContext } from "../../context/MedContext";

import EditProfileModal from "./EditProfileModal";  // import your modal

export default function Navbar() {
  const { token, setToken, user } = useContext(MedContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const [showEditProfile, setShowEditProfile] = useState(false);

  

  return (
    <>
      <header style={{ background: "#fff", borderBottom: "1px solid #eef0f4", padding: "0 0 0 0" }}>
        <nav style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 54px" }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="fas fa-shield-alt" style={{ color: "#2563eb", fontSize: 28, marginRight: 10 }} />
            <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 26, letterSpacing: 0.4 }}>MedVault</span>
            <span style={{ fontWeight: 400, color: "#aaa", fontSize: 13, marginLeft: 7 }}>Every Dose Matters</span>
          </div>

          {/* Navigation Links */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {token ? (
              <>
                {/* Your existing nav links... */}
                <Link
                  to="/"
                  style={{
                    color: pathname === "/" ? "#2563eb" : "#344054",
                    background: pathname === "/" ? "#eff6ff" : "transparent",
                    borderRadius: 8,
                    padding: "8px 24px",
                    fontWeight: pathname === "/" ? 700 : 500,
                    fontSize: 16,
                    marginLeft: 10,
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>

                {/* Inventory link only for agency users */}
{(user?.role === "agency" || user?.role === "vendor") && (
  <Link
    to="/inventory"
    style={{
      color: pathname === "/inventory" ? "#2563eb" : "#344054",
      background: pathname === "/inventory" ? "#eff6ff" : "transparent",
      borderRadius: 8,
      padding: "8px 24px",
      fontWeight: pathname === "/inventory" ? 700 : 500,
      fontSize: 16,
      marginLeft: 10,
      textDecoration: "none",
    }}
  >
    Inventory
  </Link>
)}

                <Link
                  to="/alerts"
                  style={{
                    color: pathname === "/alerts" ? "#2563eb" : "#344054",
                    background: pathname === "/alerts" ? "#eff6ff" : "transparent",
                    borderRadius: 8,
                    padding: "8px 24px",
                    fontWeight: pathname === "/alerts" ? 700 : 500,
                    fontSize: 16,
                    marginLeft: 10,
                    textDecoration: "none",
                  }}
                >
                  Alerts
                </Link>

                {/* Profile and Logout */}
                <div style={{ display: "flex", alignItems: "center", gap: 13, marginLeft: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{user?.name || "User"}</span>
                    <span style={{ color: "#6b7280", fontSize: 13 }}>
                      {user?.role === "agency" ? "Agency Administrator" : "Vendor"}
                    </span>
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#eef1fd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    title="Edit Profile"
                    onClick={() => setShowEditProfile(true)}  // Open modal on click
                  >
                    <i className="fas fa-user" style={{ color: "#2563eb", fontSize: 19 }} />
                  </div>
                  <button
                    style={{
                      background: "#fff",
                      color: "#2563eb",
                      border: "1.5px solid #2563eb",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 16,
                      padding: "8px 18px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setToken(null);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: "#2563eb",
                    background: "#eff6ff",
                    borderRadius: 8,
                    padding: "8px 24px",
                    fontWeight: 700,
                    fontSize: 16,
                    marginLeft: 10,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    color: "#2563eb",
                    background: "#e0e7ff",
                    borderRadius: 8,
                    padding: "8px 24px",
                    fontWeight: 700,
                    fontSize: 16,
                    marginLeft: 10,
                    textDecoration: "none",
                  }}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Render EditProfileModal when showEditProfile is true */}
      {showEditProfile && <EditProfileModal onClose={() => setShowEditProfile(false)} />}
    </>
  );
}
