"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || '';
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Start the Server
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
