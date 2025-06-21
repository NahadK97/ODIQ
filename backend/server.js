require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = require("./backend/routes/questions");
const userRoutes = require("./backend/routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Improved CORS configuration
const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",")
  : ["http://localhost:3000"]; // Default fallback

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check against allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Special handling for Vercel preview URLs with wildcards
      if (process.env.NODE_ENV === "production") {
        const originHost = new URL(origin).hostname;
        if (
          allowedOrigins.some((allowed) => {
            return (
              originHost.endsWith(".vercel.app") &&
              allowed.includes("*") &&
              originHost.includes(allowed.replace("*.vercel.app", ""))
            );
          })
        ) {
          return callback(null, true);
        }
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

// routes
app.use("/api/questions", questionRoutes);
app.use("/api/user", userRoutes);

// connect to db with improved error handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true, // Recommended for MongoDB Atlas
    w: "majority", // Write concern
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Only listen locally in development
    if (process.env.NODE_ENV !== "production") {
      const port = process.env.PORT || 4000; // Fallback port
      app.listen(port, () => {
        console.log(`Server running in development on port ${port}`);
      });
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  });

module.exports = app; // For Vercel serverless

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     // listen for requests once connected to db
//     app.listen(process.env.PORT, () => {
//       console.log(
//         "Connected to DB and server is listening on port",
//         process.env.PORT
//       );
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });
