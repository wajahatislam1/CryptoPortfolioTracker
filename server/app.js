// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("./src/configs/passport.config");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const cronJobs = require("./src/cronJobs/index");

const { PORT } = require("./src/configs/env.config");
const cors = require("cors");

//Load routes
const routes = require("./src/routes/index");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.options("*", cors());

// Session middleware
app.use(
  session({
    store: new FileStore({ path: "./data/sessions" }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Attaching routes to the app
app.use("/api/v1/", routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// Initialize passport
app.use(passport.initialize());

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
