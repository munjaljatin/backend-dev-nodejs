const express = require("express");

const app = express();

const PORT = 4000;

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to GraphQL Task Manager API",
    success: true,
  });
});

// About Route
app.get("/about", (req, res) => {
  res.json({
    project: "GraphQL Task Manager",
    version: "1.0.0",
  });
});

// Health Check Route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
