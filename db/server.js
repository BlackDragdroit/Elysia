const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is required. Set it in the environment or db/.env");
  process.exit(1);
}

const app = require("./app");

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
