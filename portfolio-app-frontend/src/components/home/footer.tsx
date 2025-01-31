import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-left">
        <div className="social-icons footer-left-item">
          <a
            href="https://www.instagram.com/isaiah_plumm/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://github.com/ZekePlumm44"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/isaiahplumm315/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://bsky.app/profile/isaiahplumm.bsky.social"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-bluesky"></i>
          </a>
        </div>
        <div className="footer-left-item">
          <i className="fa-solid fa-location-dot"></i>
          Made in Fairport, NY
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right-item">
          <a href="/resume">Resume</a>
        </div>
        <div className="footer-right-item">Beauty will save the world.</div>
      </div>
    </footer>
  );
}
