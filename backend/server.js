require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questions");
const userRoutes = require("./routes/user");
// express app
const app = express();

// middleware
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const allowedOrigins = process.env.CLIENT_URLS.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// routes
app.use("/api/questions", questionRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests once connected to db
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to DB and server is listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
