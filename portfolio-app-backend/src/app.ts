import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes';
import photoRoutes from './routes/photoRoutes';
import spotifyRoutes from './routes/spotifyRoutes';
import literalRoutes from './routes/literalRoutes';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchCurrentlyPlaying } from './controllers/spotifyController';
import { fetchCurrentlyReading } from './controllers/literalController';

const envResult = dotenv.config();

if (envResult.error) {
  console.error('Error loading .env file:', envResult.error);
  process.exit(1);
}

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing Spotify credentials in environment variables');
}

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/literal', literalRoutes);

//Fetch currently playing every 15 seconds
cron.schedule('*/15 * * * * *', () => {
  fetchCurrentlyPlaying();
});

// Fetch currently reading every 8 hours
cron.schedule('0 0 */8 * * *', () => {
  fetchCurrentlyReading();
});

// Initial fetch on server start
fetchCurrentlyPlaying();
fetchCurrentlyReading();

export const startServer = () => {
  const PORT = process.env.PORT || 5001;
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export default app;
