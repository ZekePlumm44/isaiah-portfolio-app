import axios from 'axios';
import { ReadingStatus } from '../types/readingStatus';

const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || 'isaiah-portfolio-api:5001';

export const fetchCurrentlyReading =
  async (): Promise<ReadingStatus | null> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/literal/currently-reading`
      );

      if (response.data.message) {
        return null;
      }
      const reading = response.data;
      return reading;
    } catch (error) {
      console.error('Error fetching currently reading book:', error);
      throw new Error('Failed to fetch currently reading book.');
    }
  };
