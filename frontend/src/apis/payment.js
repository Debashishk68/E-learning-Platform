import API_BASE_URL from "../config/api"
// Create Razorpay Order
export const createOrder = async (amount) => {
  const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};

// Verify Payment
export const verifyPayment = async (paymentDetails) => {
  const res = await fetch(`${API_BASE_URL}/payment/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentDetails),
  });
  return res.json();
};

export const getAdminPayments = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include auth token if required
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials:"include"
  });

  const data = await res.json();
  return data;
};