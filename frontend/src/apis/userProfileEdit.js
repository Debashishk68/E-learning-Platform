import { Form } from "react-router-dom";
import API_BASE_URL from "../config/api";

export const editProfileApi = async (data) => {
    const form = new FormData()
    if(data.profilePic){
    form.append("profilePic",data.profilePic)
    }
    form.append("name",data.name)
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/edit-profile`, {
      method: "PUT",
      credentials: "include", // send cookies (for JWT auth)
      body: form, // FormData includes name and file
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/delete`, {
      method: "DELETE",
      credentials: "include", // include cookies (JWT)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
