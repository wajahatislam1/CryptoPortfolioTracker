const express = require("express");
const router = express.Router();

const userAccountController = require("../../controllers/user/user.controller");
const userValidator = require("../../validators/user/user.validator");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.post("/signup", userValidator.authValidator, userAccountController.addUserAccount);

router.post(
  "/signin/local",
  authMiddleware.authenticateUser,
  userValidator.authValidator,
  userAccountController.signInUser
);

router.get("/signin/google", authMiddleware.authenticateGoogle);

router.get(
  "/signin/google/callback",
  authMiddleware.authenticateGoogle,
  userAccountController.googleSignIn
);

router.get("/signout", authMiddleware.authenticateJWT, userAccountController.signOutUser);

router.put(
  "/",
  authMiddleware.authenticateJWT,
  userValidator.updateUserValidator,
  userAccountController.updateUserAccount
);
router.delete("/", authMiddleware.authenticateJWT, userAccountController.deleteUserAccount);

router.get("/tokenValid", authMiddleware.authenticateJWT, (req, res) => {
  res.status(200).send("Token is valid, and your request is Authorized.");
});

module.exports = router;
