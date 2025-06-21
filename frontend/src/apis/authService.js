import API_BASE_URL from "../config/api"
const registerUser = async (user) => {

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include", // to include cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const LoginUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const LogoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Logout failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export { registerUser, LoginUser, LogoutUser };
