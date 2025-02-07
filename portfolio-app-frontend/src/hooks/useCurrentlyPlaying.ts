import { useState, useEffect } from 'react';
import { fetchCurrentlyPlaying } from '../services/listeningService';
import { ListeningStatus } from '../types/listeningStatus';

export const useCurrentlyPlaying = () => {
  const [listeningStatus, setListeningStatus] =
    useState<ListeningStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: number;

    const loadCurrentlyPlaying = async () => {
      try {
        const status = await fetchCurrentlyPlaying();
        if (status) {
          setListeningStatus(status);
        } else {
          console.error('No music currently playing');
        }
      } catch (err) {
        console.error('Component fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentlyPlaying();

    intervalId = window.setInterval(loadCurrentlyPlaying, 28800000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return { listeningStatus, loading };
};
