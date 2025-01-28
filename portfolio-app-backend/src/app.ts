import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes";
import photoRoutes from "./routes/photoRoutes";
import spotifyRoutes from "./routes/spotifyRoutes";
import literalRoutes from "./routes/literalRoutes";
import dotenv from "dotenv";

const envResult = dotenv.config();

if (envResult.error) {
    console.error("Error loading .env file:", envResult.error);
    process.exit(1);
}

// Verify Spotify credentials
console.log("Spotify Client ID:", process.env.SPOTIFY_CLIENT_ID?.slice(0, 5) + "...");

// Add this immediately after dotenv.config()
if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing Spotify credentials in environment variables");
}

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Add this before other middleware
app.set("strict routing", false); // Disable strict route matching

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/literal", literalRoutes);

export const startServer = () => {
    const PORT = process.env.PORT || 5001;
    return app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default app;
