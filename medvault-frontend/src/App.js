import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MedContext } from "./context/MedContext";

import Navbar from "./components/common/Navbar";
import DashboardScreen from "./components/dashboard/DashboardScreen";
import InventoryScreen from "./components/inventory/InventoryScreen";
import AlertsScreen from "./components/dashboard/AlertsScreen";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";

export default function App() {
  const { token, user } = useContext(MedContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />

        <Route path="/" element={token ? <DashboardScreen /> : <Navigate to="/login" />} />

<Route
  path="/inventory"
  element={
    token && (user?.role === "agency" || user?.role === "vendor") ? (
      <InventoryScreen />
    ) : (
      <Navigate to="/login" />
    )
  }
/>


        <Route
          path="/alerts"
          element={token ? <AlertsScreen /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
