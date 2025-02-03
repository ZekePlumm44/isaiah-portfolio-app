interface MediaCardProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  loading?: boolean;
  size?: {
    width: number;
    height: number;
    textWidth?: string;
  };
}

export default function MediaCard({
  title,
  subtitle,
  image,
  href,
  loading,
  size = { width: 64, height: 64, textWidth: '100%' },
}: MediaCardProps) {
  return (
    <a
      href={href}
      className="media-card-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="media-card" style={{ width: `${size.width}px` }}>
        <div className="media-card-image-container">
          <img
            src={image}
            alt={title}
            className="media-card-image"
            style={{
              width: size.width,
              height: size.height,
            }}
          />
          {loading && <div className="media-card-loading">Loading...</div>}
        </div>
        <div className="media-card-text">
          <h2 className="media-card-title">{title}</h2>
          <p className="media-card-subtitle">{subtitle}</p>
        </div>
      </div>
    </a>
  );
}
