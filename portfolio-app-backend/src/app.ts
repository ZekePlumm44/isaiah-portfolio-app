import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes";
import photoRoutes from "./routes/photoRoutes";
import spotifyRoutes from "./routes/spotifyRoutes";
import literalRoutes from "./routes/literalRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/literal", literalRoutes);

export default app;
