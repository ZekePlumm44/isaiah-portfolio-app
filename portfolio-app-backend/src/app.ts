import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes';
import photoRoutes from './routes/photoRoutes';
import spotifyRoutes from './routes/spotifyRoutes';
import literalRoutes from './routes/literalRoutes';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { fetchCurrentlyPlaying } from './controllers/spotifyController';
import { fetchCurrentlyReading } from './controllers/literalController';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app: Application = express();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];
console.log(`ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}`);
// Middleware
const corsOptions = {
  origin: ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(process.env.NODE_ENV != 'production' ? undefined : corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/literal', literalRoutes);

//Fetch currently playing every 15 seconds
cron.schedule('*/10 * * * * *', () => {
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
    console.log(ALLOWED_ORIGINS);
    console.log(`hi`);
  });
};

export default app;
