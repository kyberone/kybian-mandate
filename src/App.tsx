import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Wind, ChevronRight, Lock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import './App.css';

const posters = [
  { id: 1, title: 'STRENGTH THROUGH ORDER', image: '/images/mandate-poster.png' },
  { id: 2, title: 'THE MILLENNIUM OF PEACE', image: '/images/mandate-poster.png' },
  { id: 3, title: 'LOYALTY IS OXYGEN', image: '/images/mandate-poster.png' },
];

function App() {
  const [citizenId, setCitizenId] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [powerFlicker, setPowerFlicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setPowerFlicker(true);
        setTimeout(() => setPowerFlicker(false), 100);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationStatus('validating');
    setTimeout(() => {
      if (citizenId.startsWith('SM-') && citizenId.length > 8) {
        setValidationStatus('success');
      } else {
        setValidationStatus('error');
      }
    }, 1500);
  };

  return (
    <div className={`mandate-container ${powerFlicker ? 'power-flicker' : ''}`}>
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

      <section className="power-alert">
        <AlertTriangle size={14} />
        <span>POWER RATIONING IN EFFECT: SECTOR 4-9 GRID INSTABILITY DETECTED. DO NOT PANIC.</span>
      </section>

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
            <a href="#registry" className="button-mandate">Enter the Registry</a>
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
            <form className="registry-form" onSubmit={handleValidate}>
              <div className="input-group">
                <label>Citizen ID / DNA Signature</label>
                <div className="input-with-status">
                  <input 
                    type="text" 
                    placeholder="SM-XXXX-XXXX" 
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                  />
                  {validationStatus === 'success' && <CheckCircle2 className="status-icon success" size={20} />}
                  {validationStatus === 'error' && <XCircle className="status-icon error" size={20} />}
                </div>
              </div>
              <div className="input-group">
                <label>Sector Assignment</label>
                <select>
                  <option>Core Prime</option>
                  <option>Inner Rings</option>
                  <option>Outer Shallows</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="button-mandate full-width"
                disabled={validationStatus === 'validating'}
              >
                {validationStatus === 'validating' ? 'VALIDATING...' : 'Validate Identity'}
              </button>
            </form>
            <AnimatePresence>
              {validationStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="infraction-notice"
                >
                  <AlertTriangle size={18} />
                  <div>
                    <strong>INFRACTION DETECTED</strong>
                    <p>Identity mismatch. Please report to the nearest Correction Center for DNA recalibration.</p>
                  </div>
                </motion.div>
              )}
              {validationStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="success-notice"
                >
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>ACCESS GRANTED</strong>
                    <p>Welcome, Citizen. Your oxygen allocation has been confirmed.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              <div 
                key={day} 
                className={`ration-day ${selectedDay === i ? 'active' : ''}`}
                onClick={() => setSelectedDay(i)}
              >
                <span className="day-name">{day}</span>
                <span className="ration-status">{i === 2 ? '100% Flow' : i % 2 === 0 ? '60% Flow' : '40% Flow'}</span>
                <div className="flow-meter">
                  <div className="flow-fill" style={{ width: i === 2 ? '100%' : i % 2 === 0 ? '60%' : '40%' }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="disclaimer">* Unauthorized breathing outside of assigned flow periods is a Level 2 Infraction. Select a day to view your specific allocation.</p>
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

