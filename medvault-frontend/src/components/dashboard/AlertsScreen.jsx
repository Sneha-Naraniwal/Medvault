import React, { useContext } from "react";
import { MedContext } from "../../context/MedContext";

const alertCardColor = {
  critical: "#ef4444",
  warning: "#f59e42",
  info: "#2563eb",
};
const alertCardBg = {
  critical: "#feeeee",
  warning: "#fff7ea",
  info: "#f7fafd",
};

export default function AlertsScreen() {
  const { user, alerts } = useContext(MedContext);

  // Replace the dummy alerts with real fetched alerts:
  // const alerts = ... from context

  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh", padding: 0 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "42px 0" }}>
        <h1
          style={{
            fontWeight: 900,
            fontSize: 32,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            color: "#21294c",
          }}
        >
          <span style={{ color: "#2563eb", marginRight: 12 }}>
            <i className="fas fa-bell"></i>
          </span>
          Alert Management
        </h1>
        {/* Only Agency can Send Bulk Alerts */}
        {user?.role === "agency" && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "13px 28px",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={() => {
                // your bulk alert send logic here
                alert("Send Bulk Alerts clicked");
              }}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: 6 }} /> Send Bulk Alerts
            </button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {alerts.map((alert) => (
            <div
              key={alert._id || alert.id}
              style={{
                background: alertCardBg[alert.type] || "#fff",
                borderLeft: `5px solid ${alertCardColor[alert.type] || "#2563eb"}`,
                borderRadius: 16,
                boxShadow: "0 1.5px 10px 0 rgb(16 30 54 / 7%)",
                padding: "26px 36px",
                display: "flex",
                alignItems: "center",
                gap: 27,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className={`fas ${
                    alert.type === "critical"
                      ? "fa-triangle-exclamation"
                      : alert.type === "warning"
                      ? "fa-circle-exclamation"
                      : "fa-bell"
                  }`}
                  style={{
                    fontSize: 38,
                    color: alertCardColor[alert.type] || "#2563eb",
                    marginRight: 14,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{alert.title}</div>
                <div style={{ fontSize: 15, marginBottom: 8, color: "#3d4465" }}>{alert.message}</div>
                <div style={{ color: "#77809f", fontSize: 14, display: "flex", gap: 22 }}>
                  <span>Vendor: {alert.vendor?.name || alert.vendor}</span>
                  <span>Quantity: {alert.quantity} units</span>
                  <span>Sent: {alert.timestamp || "Unknown"}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {/* Agency only buttons */}
                {user?.role === "agency" && (
                  <>
                    <button
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 24px",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                      onClick={() => alert("Resend Alert clicked")}
                    >
                      Resend
                    </button>
                    <button
                      style={{
                        background: "#fff",
                        border: "1.6px solid #d1d5db",
                        borderRadius: 8,
                        color: "#344054",
                        fontWeight: 600,
                        padding: "10px 24px",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                      onClick={() => alert("Mark Resolved clicked")}
                    >
                      Mark Resolved
                    </button>
                  </>
                )}

                {/* Vendor only action, e.g., confirm disposal */}
                {user?.role === "vendor" && (
                  <button
                    style={{
                      background: "#10b981",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Confirm Disposal clicked")}
                  >
                    Confirm Disposal
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
