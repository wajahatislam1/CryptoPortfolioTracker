const userAccountService = require("../../services/user/user.service");
const passwordUtils = require("../../utils/password.utils");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../configs/env.config");
const uuid = require("uuid");

const { validationResult } = require("express-validator");

const GOOGLE_AUTH_CLIENT_REDIRECT_URL = "http://localhost:5173/users/auth/google";

const addUserAccount = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const salt = crypto.randomBytes(16);
  const hashedPassword = await passwordUtils.hashPassword(req.body.password, salt);

  // creating the account info object
  userAccount = {
    email: req.body.email,
    password: hashedPassword,
    salt: salt.toString("hex"),
    source: "local",
  };

  // Calling the service to add the user account
  try {
    await userAccountService.addUserAccount(userAccount);
    res.status(201).json({ message: "User account created successfully" });
  } catch (error) {
    // Send a JSON response
    res.status(400).json({ errors: [{ msg: error.message }] });
  }
};

const signInUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const user = req.user;
  const userToken = {
    _id: user._id,
    email: user.email,
    source: user.source,
  };

  const token = jwt.sign({ user: userToken }, JWT_SECRET_KEY, { expiresIn: "1h" });

  try {
    await userAccountService.addToken(user._id, token);
    res.status(200).json({ token });
  } catch (erorr) {
    console.error("Error in storing token: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleSignIn = async (req, res) => {
  const user = req.user;
  //Create object  to tokenize that  contains only necessary information.
  const userToken = {
    _id: String(user._id),
    email: user.email,
    source: user.source,
  };

  const token = jwt.sign({ user: userToken }, JWT_SECRET_KEY, { expiresIn: "1h" });

  try {
    await userAccountService.addToken(user._id, token);
    //Redirect  user
    res.redirect(`${GOOGLE_AUTH_CLIENT_REDIRECT_URL}?token=${token}`);
  } catch (erorr) {
    console.error("Error in storing token: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signOutUser = async (req, res) => {
  const user = req.user;
  const token = req.headers.authorization.split(" ")[1];

  try {
    await userAccountService.removeToken(user._id, token);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("Error in signing out user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserAccount = async (req, res) => {
  //Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let accountInfo = req.body;
  const user = req.user;

  // Check if no fields are provided to update
  if (!accountInfo.name && !accountInfo.password) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  // Check if password is provided
  if (accountInfo.password) {
    //verify if previous password is provided
    if (
      !(await passwordUtils.doPasswordsMatch(
        user.password,
        accountInfo.previousPassword,
        user.salt
      ))
    ) {
      return res.status(400).json({ message: "Previous password is incorrect" });
    }

    const salt = crypto.randomBytes(16);
    const hashedPassword = await passwordUtils.hashPassword(accountInfo.password, salt);
    accountInfo.password = hashedPassword;
    accountInfo.salt = salt.toString("hex");
  }

  try {
    //Deleting not required fields
    delete accountInfo.previousPassword;
    delete accountInfo.confirmedPassword;

    await userAccountService.updateUserAccount(user._id, accountInfo);
    res.status(200).json({ message: "User account updated successfully" });
  } catch (error) {
    console.error("Error in updating user account: ", error);
    res.status(500).json({ message: "Internal server error " });
  }
};

const deleteUserAccount = async (req, res) => {
  const user = req.user;

  try {
    await userAccountService.deleteUserAccount(user._id);
    res.status(200).send("User account deleted successfully");
  } catch (error) {
    console.error("Error in deleting user account: ", error);
    res.status(500).json({ message: `Failed to delete user account: ${error.message}` });
  }
};

module.exports = {
  addUserAccount,
  signInUser,
  signOutUser,
  updateUserAccount,
  deleteUserAccount,
  googleSignIn,
};
