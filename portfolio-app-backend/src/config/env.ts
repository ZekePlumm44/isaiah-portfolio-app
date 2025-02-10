import dotenv from 'dotenv';

// Load env first before any other imports
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}
