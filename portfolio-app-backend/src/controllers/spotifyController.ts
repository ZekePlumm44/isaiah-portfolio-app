import '../config/env';
import axios from 'axios';
import querystring from 'querystring';
import { Request, Response } from 'express';
import { ListeningStatus } from '../types/listeningStatus';

let accessToken = process.env.SPOTIFY_ACCESS_TOKEN || '';
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || '';
let cachedListeningStatus: ListeningStatus | null = null;

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    accessToken = response.data.access_token;
    if (response.data.refresh_token) {
      refreshToken = response.data.refresh_token;
    }
  } catch (error: unknown) {
    console.error(
      'Failed to refresh access token:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export async function fetchCurrentlyPlaying() {
  try {
    // Attempt to fetch currently playing track
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || !response.data) {
      return;
    }

    const data = response.data;
    cachedListeningStatus = {
      song: data.item.name,
      artists: data.item.artists.map((artist: { name: string }) => artist.name),
      album: data.item.album.name,
      albumArt: data.item.album.images[2]?.url || '',
      isPlaying: data.is_playing,
      spotifyUrl: data.item.external_urls.spotify,
    } as ListeningStatus;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        // Token expired, refresh it
        try {
          await refreshAccessToken();
          // Retry fetching the currently playing track
          return fetchCurrentlyPlaying();
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          return;
        }
      }
    }
  }
}

export const getCurrentlyPlaying = async (req: Request, res: Response): Promise<void> => {
  if (cachedListeningStatus) {
    res.status(200).json(cachedListeningStatus);
  } else {
    res.status(200).json({ message: 'No song currently playing' });
  }
};
