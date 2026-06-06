import React, { useContext, useState } from "react";
import { MedContext } from "../../context/MedContext";

export default function AlertModal({ medicine, onClose }) {
  const { vendors, sendAlert } = useContext(MedContext);

  const defaultMessage = `Batch ${medicine.batchNo} of ${medicine.name} expires on ${new Date(medicine.expiryDate).toLocaleDateString()}`;

  const [message, setMessage] = useState(defaultMessage);
  const [vendorId, setVendorId] = useState(medicine.vendor?._id || (vendors[0] && vendors[0]._id));
  const [type, setType] = useState("critical");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) {
      alert("Please select a vendor");
      return;
    }
    setLoading(true);
    const ok = await sendAlert({
      medicineId: medicine._id,
      sentToId: vendorId,
      message,
      type,
    });
    setLoading(false);
    if (ok) {
      alert("Alert sent successfully");
      onClose();
    } else {
      alert("Failed to send alert");
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
    }}>
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: "white", padding: 24, borderRadius: 12,
          width: 400, boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          display: "flex", flexDirection: "column", gap: 12,
        }}
      >
        <h2>Send Alert</h2>

        <label>
          Vendor
          <select
            value={vendorId}
            onChange={e => setVendorId(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          >
            <option value="">Select vendor</option>
            {vendors.map(v => (
              <option key={v._id} value={v._id}>{v.name} ({v.email})</option>
            ))}
          </select>
        </label>

        <label>
          Alert Type
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          >
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button type="button" onClick={onClose} disabled={loading} style={{ padding: "8px 16px" }}>
            Cancel
          </button>
          <button type="submit" disabled={loading} style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "white" }}>
            {loading ? "Sending..." : "Send Alert"}
          </button>
        </div>
      </form>
    </div>
  );
}
