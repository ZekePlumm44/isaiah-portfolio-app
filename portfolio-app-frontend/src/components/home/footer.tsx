import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Footer() {
    return (
        <footer className="footer-section">
            <div>
            <div className="social-icons">
                <a href="https://www.instagram.com/isaiah_plumm/" target="_blank">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://github.com/ZekePlumm44" target="_blank">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/isaiahplumm315/" target="_blank">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://bsky.app/profile/yourprofile" target="_blank">
                    <i className="fab fa-bluesky"></i>
                </a>
            </div>
                <div>
                    <i className="fa-solid fa-location-dot"></i>
                    Made in Fairport, NY
                </div>
            </div>
            <div>
                <div>
                    Beauty will save the world.
                </div>
                <div>
                    Hosted by Porkbun
                </div>
            </div>
        </footer>
    );
}