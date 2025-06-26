import React from "react"
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container1">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Horizon</h2>
            <p>Transforming digital experiences with innovative solutions.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                FB
              </a>
              <a href="#" className="social-link">
                TW
              </a>
              <a href="#" className="social-link">
                IG
              </a>
              <a href="#" className="social-link">
                LI
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Integrations</a>
                </li>
                <li>
                  <a href="#">Updates</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
                <li>
                  <a href="#">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Horizon. All rights reserved.</p>
          <div className="language-selector">
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer