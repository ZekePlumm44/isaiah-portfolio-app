import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));