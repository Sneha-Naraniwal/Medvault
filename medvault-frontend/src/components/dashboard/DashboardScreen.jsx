import React, { useContext } from "react";
import { MedContext } from "../../context/MedContext";
import { useNavigate } from "react-router-dom";
import { FaPills, FaClock, FaExclamationTriangle, FaTrash, FaArrowRight, FaChartLine } from "react-icons/fa";

const bannerSVG = "https://www.svgrepo.com/show/281011/pharmacy-medicine.svg";

const STAT_INFO = [
  {
    key: "stock",
    label: "Current Stock",
    sub: "Ready for use, not disposed",
    icon: FaPills,
    color: "#10b981",
    bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    shadow: "0 8px 32px rgba(16, 185, 129, 0.15)",
  },
  {
    key: "expiring",
    label: "Expiring Soon",
    sub: "Within 30 days",
    icon: FaClock,
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    shadow: "0 8px 32px rgba(245, 158, 11, 0.15)",
  },
  {
    key: "expired",
    label: "Expired Stock",
    sub: "Past expiry, not disposed",
    icon: FaExclamationTriangle,
    color: "#ef4444",
    bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    shadow: "0 8px 32px rgba(239, 68, 68, 0.15)",
  },
  {
    key: "disposed",
    label: "Disposed Items",
    sub: "Permanently removed",
    icon: FaTrash,
    color: "#6366f1",
    bg: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    shadow: "0 8px 32px rgba(99, 102, 241, 0.15)",
  },
];

export default function DashboardScreen() {
  const { medicines, user } = useContext(MedContext);
  const navigate = useNavigate();

  const now = new Date();
  const disposed = medicines.filter((m) => m.status === "disposed");
  const stockMeds = medicines.filter((m) => m.status !== "disposed");
  const expiringSoon = stockMeds.filter((m) => {
    if (!m.expiryDate) return false;
    const days = (new Date(m.expiryDate) - now) / (1000 * 3600 * 24);
    return days > 0 && days <= 30;
  });
  const expired = stockMeds.filter((m) => {
    if (!m.expiryDate) return false;
    return new Date(m.expiryDate) <= now;
  });

  const stockCount = stockMeds.length;
  const expiringSoonCount = expiringSoon.length;
  const expiredCount = expired.length;
  const disposedCount = disposed.length;
  const total = medicines.length || 1;

  const chartVals = [
    { value: stockCount, color: "#10b981", label: "Stock" },
    { value: expiringSoonCount, color: "#f59e0b", label: "Expiring" },
    { value: expiredCount, color: "#ef4444", label: "Expired" },
    { value: disposedCount, color: "#6366f1", label: "Disposed" },
  ];

  const pharmacyName = user?.name || "MedVault User";
  const pharmacyRole = user?.role === "vendor" ? "Vendor" : "Agency";

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)",
      minHeight: "100vh", 
      padding: "40px 24px" 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Hero Section */}
        <div style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
          borderRadius: 24,
          padding: "48px",
          marginBottom: 32,
          boxShadow: "0 20px 60px rgba(37, 99, 235, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(40px)",
          }}></div>
          <div style={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(40px)",
          }}></div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                display: "inline-block",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "6px 16px",
                borderRadius: 20,
                marginBottom: 12,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}>
                {pharmacyRole}
              </div>
              <h1 style={{ 
                color: "#fff", 
                fontSize: 42, 
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}>
                {pharmacyName}
              </h1>
              <p style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                fontSize: 18,
                fontWeight: 500,
                marginBottom: 24,
                maxWidth: 480,
              }}>
                Welcome back! Keep your inventory safe and up to date with real-time tracking.
              </p>
              <button
                style={{
                  background: "#fff",
                  color: "#2563eb",
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/inventory")}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
                }}
              >
                Go to Inventory
                <FaArrowRight size={14} />
              </button>
            </div>
            
            <div style={{ 
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 200,
            }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                borderRadius: "50%",
                padding: 40,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={bannerSVG}
                  alt="dashboard"
                  width={120}
                  height={120}
                  style={{ 
                    display: "block", 
                    filter: "brightness(0) invert(1)",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginBottom: 32,
        }}>
          <StatCard {...STAT_INFO[0]} count={stockCount} />
          <StatCard {...STAT_INFO[1]} count={expiringSoonCount} />
          <StatCard {...STAT_INFO[2]} count={expiredCount} />
          <StatCard {...STAT_INFO[3]} count={disposedCount} />
        </div>

        {/* Chart Section */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
          marginBottom: 24,
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 12,
            marginBottom: 24,
          }}>
            <FaChartLine size={24} style={{ color: "#2563eb" }} />
            <h2 style={{ 
              fontSize: 24, 
              fontWeight: 700,
              color: "#1e293b",
              margin: 0,
            }}>
              Inventory Distribution
            </h2>
          </div>

          {/* Progress Bar */}
          <div style={{
            display: "flex",
            borderRadius: 12,
            overflow: "hidden",
            height: 24,
            background: "#f1f5f9",
            marginBottom: 20,
          }}>
            {chartVals.map((s, i) => (
              <div
                key={i}
                style={{
                  height: "100%",
                  width: `${(s.value / total) * 100}%`,
                  background: s.color,
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  minWidth: s.value ? 8 : 0,
                }}
              ></div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}>
            {chartVals.map((item, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 8,
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: item.color,
                }}></div>
                <span style={{ 
                  fontSize: 14, 
                  fontWeight: 600,
                  color: "#64748b",
                }}>
                  {item.label}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          borderRadius: 16,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 4px 16px rgba(245, 158, 11, 0.15)",
        }}>
          <div style={{
            background: "#f59e0b",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 20 }}>💡</span>
          </div>
          <p style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: "#92400e",
            lineHeight: 1.6,
          }}>
            <strong>Pro Tip:</strong> All numbers are updated in real-time. Current Stock includes all non-disposed medicines for easy tracking.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, sub, count, color, bg, shadow }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: shadow,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.8)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 48px ${color}25`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadow;
      }}
    >
      <div style={{
        background: color,
        width: 56,
        height: 56,
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        boxShadow: `0 4px 16px ${color}30`,
      }}>
        <Icon size={28} style={{ color: "#fff" }} />
      </div>
      
      <div style={{
        fontSize: 40,
        fontWeight: 800,
        color: color,
        marginBottom: 8,
        letterSpacing: "-0.5px",
      }}>
        {count}
      </div>
      
      <div style={{
        fontSize: 18,
        fontWeight: 700,
        color: "#1e293b",
        marginBottom: 4,
      }}>
        {label}
      </div>
      
      <div style={{
        fontSize: 14,
        fontWeight: 500,
        color: "#64748b",
      }}>
        {sub}
      </div>
    </div>
  );
}