const db = require("../../configs/mongodb.config").getDatabase();
const { ObjectId } = require("mongodb");
const userCollection = db.collection("users");

const addUserAccount = async (userAccount) => {
  //if  user already exists throw an error
  const user = await userCollection.findOne({ email: userAccount.email });
  if (user) {
    throw new Error("User already exists");
  }
  const result = await userCollection.insertOne(userAccount);

  // If the user account was added successfully, return the user account
  if (!result.incsertedCount === 1) {
    throw new Error("Failed to add user account");
  }
};

const getUserByEmail = async (email) => {
  return await userCollection.findOne({ email });
};

const getUserById = async (userId) => {
  return await userCollection.findOne({ _id: new ObjectId(String(userId)) });
};

const deleteUserAccount = async (userId) => {
  //Delete the user from the users collection
  const result = await userCollection.deleteOne({ _id: new ObjectId(String(userId)) });

  // If the user account was deleted successfully, return the user account
  if (!result.deletedCount === 1) {
    throw new Error("Failed to delete user account");
  }
};

const updateUserAccount = async (userId, accountInfo) => {
  //Update the user in the users collection
  const result = await userCollection.updateOne(
    { _id: new ObjectId(String(userId)) },
    { $set: accountInfo }
  );

  // If the user account was updated successfully, return the user account
  if (!result.modifiedCount === 1) {
    throw new Error("Failed to update user account");
  }
};

const hasToken = async (userId, token) => {
  //Check if the user has the token
  const user = await userCollection.findOne({ _id: new ObjectId(String(userId)) });
  return user?.tokens?.includes(token);
};

// This function is used to store a token against the email
const addToken = async (userId, token) => {
  const result = await userCollection.updateOne(
    { _id: new ObjectId(String(userId)) },
    { $push: { tokens: token } }
  );

  // If the token was added successfully, return the token
  if (!result.modifiedCount === 1) {
    throw new Error("Failed to add token");
  }
};

const removeToken = async (userId, token) => {
  const result = await userCollection.updateOne(
    { _id: new ObjectId(String(userId)) },
    { $pull: { tokens: token } }
  );

  // If the token was removed successfully, return the token
  if (!result.modifiedCount === 1) {
    throw new Error("Failed to remove token");
  }
};

module.exports = {
  addUserAccount,
  getUserById,
  getUserByEmail,
  updateUserAccount,
  deleteUserAccount,
  hasToken,
  addToken,
  removeToken,
};
