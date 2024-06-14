import {
  SIGNUP_URL,
  SIGNIN_URL,
  GOOGLE_AUTH_URL,
  TOKEN_VALID_URL,
  SIGNOUT_URL,
} from "../urls/api.urls.js";

const userSignup = async (user) => {
  try {
    let response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw new Error("An error occurred while signing up");
  }
};

const userSignIn = async (user) => {
  let response = await fetch(SIGNIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
};

const googleAuth = async () => {
  window.open(`${GOOGLE_AUTH_URL}`, "_self");
};

const tokenValid = async (token) => {
  try {
    let response = await fetch(`${TOKEN_VALID_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};

const userSignOut = async (jwtToken) => {
  let response = await fetch(SIGNOUT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response;
};

export { userSignup, userSignIn, googleAuth, tokenValid, userSignOut };
