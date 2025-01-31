import axios from 'axios';
import { ListeningStatus } from '../types/listeningStatus';

// Use Vite's way to access environment variables
const apiUrl = import.meta.env.API_BASE_URL || 'http://localhost:5001';

export const fetchCurrentlyPlaying =
  async (): Promise<ListeningStatus | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/spotify/currently-playing`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      return null;
    }
  };
