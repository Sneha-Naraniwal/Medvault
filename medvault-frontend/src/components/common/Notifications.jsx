import React, { useContext } from "react";
import { MedContext } from "../../context/MedContext";

export default function Notifications() {
  const { notifications = [] } = useContext(MedContext);  // Default to empty array

  return (
    <>
      {notifications.map((n, idx) => (
        <div
          key={n.id}
          className={`notification notification-${n.type}`}
          style={{
            position: "fixed",
            top: 20 + idx * 70,
            right: 20,
            zIndex: 9999,
            minWidth: 300,
          }}
        >
          <div className="notification-content">
            <i
              className={`fas ${
                n.type === "success"
                  ? "fa-check-circle"
                  : n.type === "danger"
                  ? "fa-exclamation-triangle"
                  : "fa-info-circle"
              }`}
            ></i>
            <span>{n.message}</span>
          </div>
        </div>
      ))}
    </>
  );
}
