require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questions");
// express app
const app = express();

// middleware
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/questions", questionRoutes);

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
