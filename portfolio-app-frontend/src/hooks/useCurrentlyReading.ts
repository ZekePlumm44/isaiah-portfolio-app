import { useState, useEffect } from 'react';
import { fetchCurrentlyReading } from '../services/readingService';
import { ReadingStatus } from '../types/readingStatus';

export default function useCurrentlyReading() {
  const [readingStatus, setReadingStatus] = useState<ReadingStatus | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: number;

    const loadCurrentlyReading = async () => {
      try {
        const status = await fetchCurrentlyReading();
        if (status) {
          setReadingStatus(status);
        }
      } catch (error) {
        console.error('Error loading reading status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentlyReading();

    intervalId = window.setInterval(loadCurrentlyReading, 28800000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return { readingStatus, loading };
}
