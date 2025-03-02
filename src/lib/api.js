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

    saveToLocalStorage("authHeaders", authHeaders);

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
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(`${constants.BE_URL}/api/v1/channels`, {
      method: "POST",
      body: JSON.stringify({
        name,
        user_ids,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": authHeaders["access-token"],
        client: authHeaders.client,
        expiry: authHeaders.expiry,
        uid: authHeaders.uid,
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function addMemberToChannel(channelId, memberId) {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(
      `${constants.BE_URL}/api/v1/channel/add_member`,
      {
        method: "POST",
        body: JSON.stringify({
          id: channelId,
          member_id: memberId,
        }),
        headers: {
          "Content-Type": "application/json",
          "access-token": authHeaders["access-token"],
          client: authHeaders.client,
          expiry: authHeaders.expiry,
          uid: authHeaders.uid,
        },
      }
    );

    const data = await response.json();
    console.log("new member:", data);
    return data;
  } catch (error) {
    return error;
  }
}

// export async function deleteChannel(channelId) {
//   try {
//     const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
//     const response = await fetch(
//       `${constants.BE_URL}/api/v1/channels/${channelId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "access-token": authHeaders["access-token"],
//           client: authHeaders.client,
//           expiry: authHeaders.expiry,
//           uid: authHeaders.uid,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to delete channel");
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     return error;
//   }
// }

export async function getAllUsersChannels() {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(`${constants.BE_URL}/api/v1/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": authHeaders["access-token"],
        client: authHeaders.client,
        expiry: authHeaders.expiry,
        uid: authHeaders.uid,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function retrieveChannelMessages(channelId) {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(
      `${constants.BE_URL}/api/v1/messages?receiver_id=${channelId}&receiver_class=Channel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": authHeaders["access-token"],
          client: authHeaders.client,
          expiry: authHeaders.expiry,
          uid: authHeaders.uid,
        },
      }
    );

    const data = await response.json();
    console.log("channelId", channelId);
    return data;
  } catch (error) {
    return error;
  }
}

export async function retrieveUserMessages(userId) {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(
      `${constants.BE_URL}/api/v1/messages?receiver_id=${userId}&receiver_class=User`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": authHeaders["access-token"],
          client: authHeaders.client,
          expiry: authHeaders.expiry,
          uid: authHeaders.uid,
        },
      }
    );

    const data = await response.json();
    console.log("userId:", userId);
    return data;
  } catch (error) {
    return error;
  }
}

export async function sendMessage(receiverId, receiverClass, messageBody) {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(`${constants.BE_URL}/api/v1/messages`, {
      method: "POST",
      body: JSON.stringify({
        receiver_id: receiverId,
        receiver_class: receiverClass,
        body: messageBody,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": authHeaders["access-token"],
        client: authHeaders.client,
        expiry: authHeaders.expiry,
        uid: authHeaders.uid,
      },
    });

    if (!response.ok) {
      throw new Error(`Error sending message`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    return error;
  }
}

export async function getAllUsers() {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(`${constants.BE_URL}/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": authHeaders["access-token"],
        client: authHeaders.client,
        expiry: authHeaders.expiry,
        uid: authHeaders.uid,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getChannelDetails(channelId) {
  try {
    const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));
    const response = await fetch(
      `${constants.BE_URL}/api/v1/channels/${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": authHeaders["access-token"],
          client: authHeaders.client,
          expiry: authHeaders.expiry,
          uid: authHeaders.uid,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
