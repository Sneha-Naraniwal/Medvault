// src/components/inventory/AddMedicineModal.jsx
import React, { useContext, useState, useEffect } from "react";
import { MedContext } from "../../context/MedContext";

const overlay = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(20,30,60,0.12)", zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center",
};
const modal = {
  background: "#fff", borderRadius: 14, minWidth: 360, padding: 36,
  boxShadow: "0 2px 10px 0 rgb(16 30 54 / 17%)",
  minHeight: 300, maxWidth: 420, zIndex: 120,
};
const inputField = {
  width: "100%",
  padding: "9px 14px",
  borderRadius: "6px",
  border: "1.2px solid #cbd0da",
  fontSize: 16,
  marginTop: 5,
  outline: "none",
  marginBottom: 3,
  boxSizing: "border-box"
};

export default function AddMedicineModal({ onClose }) {
  const { addMedicine, vendors, fetchVendors } = useContext(MedContext);

  const [form, setForm] = useState({
    name: "",
    batchNo: "",
    quantity: "",
    expiryDate: "",
    vendorId: "",  // must send correct ID
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // fetch vendors if empty
  useEffect(() => {
    if (!vendors || vendors.length === 0) {
      fetchVendors();
    }
  }, [vendors, fetchVendors]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.batchNo || !form.quantity || !form.expiryDate || !form.vendorId) {
      setError("Please fill all required fields.");
      return;
    }

    setSaving(true);

    const medicinePayload = {
      name: form.name,
      batchNo: form.batchNo,
      quantity: Number(form.quantity),
      expiryDate: form.expiryDate,
      vendor: form.vendorId,  // key here matches backend expects 'vendor'
    };

    console.log("Submitting medicinePayload:", medicinePayload);

    const ok = await addMedicine(medicinePayload);
    setSaving(false);

    if (ok) {
      onClose();
    } else {
      setError("Failed to add medicine.");
    }
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 10, color: "#2563eb" }}>Add Medicine</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 600 }}>Name*</label>
            <input style={inputField} name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 600 }}>Batch No*</label>
            <input style={inputField} name="batchNo" value={form.batchNo} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 600 }}>Quantity*</label>
            <input style={inputField} name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 600 }}>Expiry Date*</label>
            <input style={inputField} name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 600 }}>Vendor*</label>
            <select
              name="vendorId"
              value={form.vendorId}
              onChange={handleChange}
              required
              style={inputField}
            >
              <option value="">Select a Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name} ({vendor.email})
                </option>
              ))}
            </select>
          </div>
          {error && <div style={{ color: "#ef4444", marginBottom: 10 }}>{error}</div>}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              style={{
                background: "#fff",
                border: "1.5px solid #d1d5db",
                borderRadius: 6,
                color: "#222",
                padding: "9px 22px",
                fontWeight: 700,
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
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
