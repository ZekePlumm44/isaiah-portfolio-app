import React, { useEffect, useState } from 'react';
import { fetchCurrentlyPlaying } from '../../services/listeningService';
import { ListeningStatus } from '../../types/listeningStatus';
import MediaCard from '../mediaCard';

const SpotifyNowPlaying: React.FC = () => {
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

    // Initial load
    loadCurrentlyPlaying();

    // Update every minute
    intervalId = window.setInterval(loadCurrentlyPlaying, 60000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <dl className="container">
      <dt className="left-item">
        <h3>Listening</h3>
      </dt>
      <dd className="right-item">
        {loading && <p>Loading...</p>}
        {listeningStatus ? (
          <MediaCard
            title={listeningStatus.song}
            subtitle={`${listeningStatus.artists.join(', ')} - ${listeningStatus.album}`}
            image={listeningStatus.albumArt}
            href={listeningStatus.spotifyUrl}
            size={{ width: 64, height: 64, textWidth: '100%' }}
          />
        ) : (
          !loading && <p>No song currently playing</p>
        )}
      </dd>
    </dl>
  );
};

export default SpotifyNowPlaying;
