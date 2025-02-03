import React from 'react';
import { useCurrentlyPlaying } from '../../hooks/useCurrentlyPlaying';
import MediaCard from '../mediaCard';

const SpotifyNowPlaying: React.FC = () => {
  const { listeningStatus, loading } = useCurrentlyPlaying();

  return (
    <dl className="container">
      <dt className="left-item">
        <h2>Listening</h2>
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
