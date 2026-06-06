import React, { useState, useContext, useEffect } from "react";
import { MedContext } from "../../context/MedContext";
import AddMedicineModal from "./AddMedicineModal";

const panel = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 1px 7px 0 rgb(16 30 54 / 6%)",
  padding: 26,
};

export default function InventoryScreen() {
  const { medicines, user, fetchMedicines, confirmDisposal } = useContext(MedContext);

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  if (!user) return null;

  // Only agency and vendor allowed
  if (user.role !== "agency" && user.role !== "vendor") {
    return <div style={{ padding: 32 }}>You do not have permission to view this page.</div>;
  }

  const canEdit = user.role === "agency";

  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <h1 style={{ fontWeight: 900, fontSize: 32, display: "flex", alignItems: "center" }}>
            <i className="fas fa-pills" style={{ color: "#2563eb", marginRight: 12 }}></i>
            Medicine Inventory
          </h1>
          {canEdit && (
            <button
              style={{
                padding: "12px 28px",
                background: "#2563eb",
                border: 0,
                color: "#fff",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
              }}
              onClick={() => setShowAdd(true)}
            >
              <i className="fas fa-plus" style={{ marginRight: 8 }} /> Add Medicine
            </button>
          )}
        </div>

        <div style={panel}>
          <h2 style={{fontWeight: 700, fontSize: 21, margin: "18px 0"}}>Total Medicines: {medicines.length}</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f7fafd" }}>
              <tr>
                {["Name", "Batch No.", "Qty", "Expiry Date", "Status", "Vendor", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      color: "#344054",
                      fontWeight: 700,
                      borderBottom: "1.5px solid #e0e6ef",
                      fontSize: 16,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {medicines.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 20, color: "#c9cad6" }}>
                    No medicines found.
                  </td>
                </tr>
              ) : (
                medicines.map((m) => (
                  <tr key={m._id} style={{ borderBottom: "1px solid #f1f2f6", fontSize: 15 }}>
                    <td style={{ padding: 13, fontWeight: 700 }}>{m.name}</td>
                    <td style={{ padding: 13 }}>{m.batchNo}</td>
                    <td style={{ padding: 13 }}>{m.quantity}</td>
                    <td style={{ padding: 13 }}>
                      {m.expiryDate
                        ? new Date(m.expiryDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td style={{ padding: 13 }}>
                      <span
                        style={{
                          background: m.quantity < 20 ? "#fee2e2" : "#e5fbe6",
                          color: m.quantity < 20 ? "#ef4444" : "#22c55e",
                          padding: "4px 13px",
                          borderRadius: 9,
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {m.status === "disposed"
                          ? "Disposed"
                          : m.quantity < 20
                          ? "Low Stock"
                          : "Available"}
                      </span>
                    </td>

                    {/* --- Always show vendor's name for vendor. For agency, show assigned vendor name --- */}
                    <td style={{ padding: 13 }}>
                      {user.role === "vendor"
                        ? user.name
                        : (m.vendor?.name || "-")}
                    </td>
                    {/* --- END VENDOR CELL --- */}

                    <td style={{ padding: 13 }}>
                      {canEdit ? (
                        <>
                          <button
                            onClick={() => alert("Send alert modal - implement")}
                            style={{
                              background: "#2563eb",
                              color: "#fff",
                              border: 0,
                              borderRadius: 5,
                              padding: "7px 19px",
                              fontWeight: 700,
                              marginRight: 7,
                              cursor: "pointer",
                            }}
                          >
                            Alert
                          </button>
                          <button
                            onClick={() => alert("Dispose medicine - implement")}
                            style={{
                              background: "#fff",
                              border: "1.5px solid #d1d5db",
                              borderRadius: 6,
                              color: "#222",
                              padding: "7px 19px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            Dispose
                          </button>
                        </>
                      ) : m.status !== "disposed" ? (
                        <button
                          onClick={() => confirmDisposal(m._id)}
                          style={{
                            background: "#10b981",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "7px 19px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Confirm Disposal
                        </button>
                      ) : (
                        <span>Disposed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showAdd && <AddMedicineModal onClose={() => setShowAdd(false)} />}
      </div>
    </div>
  );
}
