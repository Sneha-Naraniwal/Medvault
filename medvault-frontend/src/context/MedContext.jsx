// src/context/MedContext.jsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { API_BASE_URL } from "../utils/config";

export const MedContext = createContext();

export const MedProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [medicines, setMedicines] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [vendors, setVendors] = useState([]);

  const fetchMedicines = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/meds`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchAlerts = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const data = await res.json();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

const fetchVendors = useCallback(async () => {
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE_URL}/users/vendors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch vendors");
    const data = await res.json();
    setVendors(data);
  } catch (err) {
    console.error(err);
  }
}, [token]);

  // on token or user change, update localStorage and fetch data
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      fetchMedicines();
      fetchAlerts();
      if (user?.role === "agency") fetchVendors();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setMedicines([]);
      setAlerts([]);
      setVendors([]);
    }
  }, [token, user, fetchMedicines, fetchAlerts, fetchVendors]);

  const addMedicine = useCallback(
    async (medicine) => {
      if (user?.role !== "agency") return false;
      try {
        const res = await fetch(`${API_BASE_URL}/meds`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(medicine),
        });
        if (res.ok) {
          await fetchMedicines();
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    [token, user, fetchMedicines]
  );

  const sendAlert = useCallback(
    async (alertData) => {
      if (user?.role !== "agency") return false;
      try {
        const res = await fetch(`${API_BASE_URL}/alerts`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(alertData),
        });
        if (res.ok) {
          await fetchAlerts();
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    [token, user, fetchAlerts]
  );

  // Vendor confirms disposal
  const confirmDisposal = useCallback(
    async (medicineId) => {
      if (user?.role !== "vendor") return false;
      try {
        const res = await fetch(`${API_BASE_URL}/meds/${medicineId}/dispose`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          await fetchMedicines();
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    [token, user, fetchMedicines]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      medicines,
      alerts,
      vendors,
      fetchMedicines,
      fetchAlerts,
      fetchVendors,
      addMedicine,
      sendAlert,
      confirmDisposal,
      logout,
    }),
    [
      token,
      user,
      medicines,
      alerts,
      vendors,
      fetchMedicines,
      fetchAlerts,
      fetchVendors,
      addMedicine,
      sendAlert,
      confirmDisposal,
      logout,
    ]
  );

  return <MedContext.Provider value={value}>{children}</MedContext.Provider>;
};
