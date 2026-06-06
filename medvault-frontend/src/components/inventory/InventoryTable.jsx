import React, { useContext } from "react";
import { MedContext } from "../../context/MedContext";
import { formatDate } from "../../utils/helpers";

export default function InventoryTable({ medicines }) {
  const { disposeMedicine, sendAlert } = useContext(MedContext);

  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Medicine Name</th>
          <th>Batch No.</th>
          <th>Quantity</th>
          <th>Expiry Date</th>
          <th>Status</th>
          <th>Vendor</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="inventoryTableBody">
        {medicines.map((medicine) => (
          <tr
            className={`status-${medicine.status}`}
            key={medicine.id}
            data-medicine-id={medicine.id}
          >
            <td>
              <div className="medicine-info">
                <strong>{medicine.name}</strong>
                <small>{medicine.category}</small>
              </div>
            </td>
            <td>
              <code>{medicine.batchNo}</code>
            </td>
            <td>
              <span className="quantity">{medicine.quantity} units</span>
            </td>
            <td>
              <span className={`expiry-date ${medicine.status}`}>
                {formatDate(medicine.expiryDate)}
              </span>
            </td>
            <td>
              <span className={`status-badge ${medicine.status}`}>
                {medicine.status === "danger"
                  ? "Expires Soon"
                  : medicine.status === "warning"
                  ? "Monitor"
                  : "Good"}
              </span>
            </td>
            <td>{medicine.vendor}</td>
            <td>
              <div className="action-buttons">
                <button className="btn-icon btn-edit" title="Edit">
                  <i className="fas fa-edit" />
                </button>
                <button
                  className="btn-icon btn-alert"
                  title="Send Alert"
                  onClick={() => sendAlert(medicine)}
                >
                  <i className="fas fa-bell" />
                </button>
                <button
                  className="btn-icon btn-delete"
                  title="Mark Disposed"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to mark this medicine as disposed?"
                      )
                    )
                      disposeMedicine(medicine.id);
                  }}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
