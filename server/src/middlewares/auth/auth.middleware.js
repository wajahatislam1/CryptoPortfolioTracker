const passport = require("passport");

function authenticateUser(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function authenticateGoogle(req, res, next) {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = { authenticateUser, authenticateJWT, authenticateGoogle };
