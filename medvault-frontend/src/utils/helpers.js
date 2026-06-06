// src/utils/helpers.js

export const calculateStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry <= 3) return "danger";
  if (daysUntilExpiry <= 14) return "warning";
  return "success";
};

export const getCategoryName = (categoryId) => {
  const categoryMap = {
    antibiotics: "Antibiotic",
    analgesics: "Pain Relief",
    vitamins: "Supplement",
  };
  return categoryMap[categoryId] || "Other";
};

export const getVendorName = (vendorId) => {
  const vendorMap = {
    medstore: "MedStore Inc.",
    pharmacorp: "PharmaCorp Ltd.",
    healthplus: "HealthPlus Distributors",
  };
  return vendorMap[vendorId] || "Unknown Vendor";
};

// ✅ Add this missing function
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
