import React, { useEffect, useState } from 'react';
import { fetchCurrentlyReading } from '../../services/readingService';
import { ReadingStatus } from '../../types/readingStatus';
import MediaCard from '../mediaCard';

const Reading: React.FC = () => {
  const [readingStatus, setReadingStatus] = useState<ReadingStatus | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <dl className="container">
      <dt className="left-item">
        <h3>Reading</h3>
      </dt>
      <dd className="right-item">
        {loading && <p>Loading...</p>}
        {readingStatus && (
          <MediaCard
            title={readingStatus.title}
            subtitle={readingStatus.authors?.join(', ') || 'Unknown Author'}
            image={readingStatus.cover}
            href={readingStatus.url}
            size={{ width: 60, height: 90 }}
          />
        )}
        {!loading && !readingStatus && <p>No book currently reading</p>}
      </dd>
    </dl>
  );
};

export default Reading;
