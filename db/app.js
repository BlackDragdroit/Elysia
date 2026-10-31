const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const requireAuth = require("./middleware/requireAuth");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api", requireAuth, apiRoutes);

// Error handler: map shared-rule error codes to HTTP statuses.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = { NOT_FOUND: 404, VALIDATION: 400, ALREADY_COMPLETED: 409 }[err.code];
  if (status) return res.status(status).json({ error: err.message });
  if (err.name === "CastError") return res.status(404).json({ error: "Resource not found" });
  if (err.code === 11000) return res.status(409).json({ error: "Duplicate key" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
