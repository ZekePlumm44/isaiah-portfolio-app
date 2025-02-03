import React from 'react';
import useCurrentlyReading from '../../hooks/useCurrentlyReading';
import MediaCard from '../mediaCard';

const Reading: React.FC = () => {
  const { readingStatus, loading } = useCurrentlyReading();

  return (
    <dl className="container">
      <dt className="left-item">
        <h2>Reading</h2>
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
