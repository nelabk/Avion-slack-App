import { constants } from "./constant";
import { saveToLocalStorage } from "./saveToLocalStorage";

export async function login(email, password) {
  try {
    console.log(email, password);
    const response = await fetch(`${constants.BE_URL}/api/v1/auth/sign_in`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const accessToken = response.headers.get("access-token");
    const expiry = response.headers.get("expiry");
    const uid = response.headers.get("uid");
    const client = response.headers.get("client");

    const authHeaders = {
      "access-token": accessToken,
      expiry,
      uid,
      client,
    };

    saveToLocalStorage(`authHeaders_${email}`, authHeaders);

    const data = await response.json();
    console.log(data);
    return { data, authHeaders };
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.message };
  }
}

export async function register(email, password, password_confirmation) {
  try {
    console.log(email, password, password_confirmation);
    const response = await fetch(`${constants.BE_URL}/api/v1/auth/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error response:", data);
      throw new Error(data.error || "Registration failed");
    }

    console.log("Registration successful:", data);
    return { data };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: error.message };
  }
}

export async function createChannel(name, user_ids) {
  try {
    console.log(name, user_ids);
    const response = await fetch(`${constants.BE_URL}/api/v1/channels`, {
      method: "POST",
      body: JSON.stringify({
        name,
        user_ids,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": "",
        client: "",
        expiry: "",
        uid: "",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllUsersChannels() {
  try {
    const response = await fetch(`${constants.BE_URL}/api/v1/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": "",
        client: "",
        expiry: "",
        uid: "",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
