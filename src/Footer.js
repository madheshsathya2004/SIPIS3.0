import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-secondary text-white text-center py-3">
      <div className="social-links">
        <a
          href="https://www.facebook.com/ifp.pondichery"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
        <a
          href="https://x.com/ifp_india"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/french-institute-of-pondicherry-ifp-523b9824a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
        <a
          href="https://www.ifpindia.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGlobe} className="social-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
