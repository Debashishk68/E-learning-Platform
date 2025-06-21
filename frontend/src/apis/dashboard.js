import API_BASE_URL from "../config/api";

export const dashboardApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: "GET", // changed to GET (unless POST is intended)
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch dashboard data");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
