import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Wind, Image as LucideImage, ChevronRight, Lock } from 'lucide-react';
import './App.css';

const posters = [
  { id: 1, title: 'STRENGTH THROUGH ORDER', image: '/images/mandate-poster.png' },
  { id: 2, title: 'THE MILLENNIUM OF PEACE', image: '/images/mandate-poster.png' },
  { id: 3, title: 'LOYALTY IS OXYGEN', image: '/images/mandate-poster.png' },
];

function App() {
  return (
    <div className="mandate-container">
      <div className="shimmer-overlay" />
      
      {/* Navigation */}
      <nav className="mandate-nav">
        <div className="nav-logo">
          <Shield className="gold-text" size={32} />
          <span className="serif">Sovereign Mandate</span>
        </div>
        <div className="nav-links">
          <a href="#registry">Registry</a>
          <a href="#rationing">Rationing</a>
          <a href="#gallery">Duty</a>
          <a href="https://kybian.com" className="hub-link">Hub Relay</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url('/images/mandate-hero.png')` }} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1 className="serif">The Millennium of Order</h1>
          <p>Ensuring the survival of the stars through discipline, structure, and loyalty.</p>
          <div className="hero-actions">
            <button className="button-mandate">Enter the Registry</button>
          </div>
        </motion.div>
      </section>

      <main className="mandate-main">
        {/* Caste Registry Section */}
        <section id="registry" className="registry-section">
          <div className="section-header">
            <Users className="gold-text" size={40} />
            <h2 className="serif">Caste Registry</h2>
          </div>
          <div className="registry-card gold-border">
            <div className="card-top">
              <Lock size={16} className="gold-text" />
              <span>SECURE ACCESS REQUIRED</span>
            </div>
            <form className="registry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>Citizen ID / DNA Signature</label>
                <input type="text" placeholder="SM-XXXX-XXXX" />
              </div>
              <div className="input-group">
                <label>Sector Assignment</label>
                <select>
                  <option>Core Prime</option>
                  <option>Inner Rings</option>
                  <option>Outer Shallows</option>
                </select>
              </div>
              <button className="button-mandate full-width">Validate Identity</button>
            </form>
          </div>
        </section>

        {/* Oxygen Rationing Section */}
        <section id="rationing" className="rationing-section">
          <div className="section-header">
            <Wind className="gold-text" size={40} />
            <h2 className="serif">Oxygen Rationing</h2>
          </div>
          <div className="rationing-grid">
            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day, i) => (
              <div key={day} className={`ration-day ${i === 2 ? 'active' : ''}`}>
                <span className="day-name">{day}</span>
                <span className="ration-status">{i === 2 ? '100% Flow' : '60% Flow'}</span>
                <div className="flow-meter">
                  <div className="flow-fill" style={{ width: i === 2 ? '100%' : '60%' }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="disclaimer">* Unauthorized breathing outside of assigned flow periods is a Level 2 Infraction.</p>
        </section>

        {/* Duty Gallery Section */}
        <section id="gallery" className="gallery-section">
          <div className="section-header">
            <LucideImage className="gold-text" size={40} />
            <h2 className="serif">Duty Gallery</h2>
          </div>
          <div className="poster-grid">
            {posters.map((poster) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={poster.id} 
                className="poster-card"
              >
                <div className="poster-img" style={{ backgroundImage: `url(${poster.image})` }} />
                <div className="poster-info">
                  <h3 className="serif">{poster.title}</h3>
                  <ChevronRight className="gold-text" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mandate-footer">
        <div className="footer-content">
          <p className="serif">Sovereign Mandate Bureau of Information</p>
          <p>© 342 AF - "Order is Life"</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
