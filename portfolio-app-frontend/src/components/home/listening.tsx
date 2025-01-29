import React, { useEffect, useState } from "react";
import { fetchCurrentlyPlaying } from "../../services/listeningService";
import { ListeningStatus } from "../../types/listeningStatus";

const SpotifyNowPlaying: React.FC = () => {
  const [listeningStatus, setListeningStatus] = useState<ListeningStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentlyPlaying = async () => {
      try {
        const status = await fetchCurrentlyPlaying();
        setListeningStatus(status);
      } catch (err) {
        setError("Failed to fetch currently playing song.");
      }
    };
    console.log(listeningStatus);
    loadCurrentlyPlaying();
  }, []);

  return (
    <dl className="container">
      <dt className="title">
        <h3>Listening</h3>
      </dt>
      <dd className="content">
        {error && <p className="error">{error}</p>}
        {listeningStatus ? (
          <>
          {listeningStatus.albumArt && (
              <img src={listeningStatus.albumArt} alt={`${listeningStatus.song} album cover`} />
            )}
            <h4>{listeningStatus.song}</h4>
            <p>{listeningStatus.artists.join(", ")}</p>
            <p>{listeningStatus.album}</p>
          </>
        ) : (
          <p>No song currently playing.</p>
        )}
      </dd>
    </dl>
  );
};

export default SpotifyNowPlaying;