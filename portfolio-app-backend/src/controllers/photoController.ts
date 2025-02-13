import axios from 'axios';
import { Request, Response } from 'express';

const PIXELFED_BASE_URL = 'https://pixelfed.social';
const ACCESS_TOKEN = process.env.PIXELFED_ACCESS_TOKEN;

export const getUserMedia = async (req: Request, res: Response): Promise<void> => {
  if (!ACCESS_TOKEN) {
    res.status(500).json({ error: 'Pixelfed access token is not configured.' });
    return;
  }

  try {
    const response = await axios.get(`${PIXELFED_BASE_URL}/api/v1/accounts/verify_credentials`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Pixelfed API error:', error);
    res.status(500).json({ error: 'Failed to fetch media from Pixelfed.' });
  }
};
