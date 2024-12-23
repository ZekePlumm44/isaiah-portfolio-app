import styles from './NavigationBar.module.css';

const NavigationBar = () => {

    const navBarStyle: React.CSSProperties = {
      top: `${top}px`,
      width: '100%',                  // Make it take up full width but constrained by max-width
      maxWidth: '75rem',              // Constrain the max width (adjust to your preference)
      position: 'fixed',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'top 0.3s',
      boxSizing: 'border-box',         // Ensure padding and borders are included in the width
      padding: '0.625rem 1.25rem',     // Padding inside the navbar for spacing
      margin: '0 auto',     
    };

    return (
        <div>
            <div id="navigationBar" style={navBarStyle}>
              
                <div className="navLeft">
                  <b> Isaiah Plummer</b>
                </div>
                <div className="navRight">
                  <a href="#about" target="self" className={styles.navLink}>
                  About
                  </a>
                  <a href="#news" target="self" className={styles.navLink}>
                  Work
                  </a>
                  <a href="#contact" target="self" className={styles.navLink}>
                  Contact
                  </a>
                </div>
               
            </div>
        </div>
    );
}   
export default NavigationBar;