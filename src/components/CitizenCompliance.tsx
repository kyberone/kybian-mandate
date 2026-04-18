import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, AlertTriangle, CheckCircle, XCircle, Search, Calendar, MapPin, RefreshCw } from 'lucide-react';
import './CitizenCompliance.css';

interface CitizenProfile {
  id: string;
  name: string;
  caste: 'CORE' | 'INNER' | 'OUTER';
  sector: string;
  expiry: number;
  isInfected: boolean;
  photoSeed: number;
}

const SECTORS = {
  CORE: ['Sovereign Prime', 'The Bastion', 'Imperial Plaza'],
  INNER: ['The Spire Districts', 'Industrial Hub Alpha', 'Tertiary Docks'],
  OUTER: ['The Shallows', 'Ghost Station 9', 'The Halo Rim'],
};

const CASTE_COLORS = {
  CORE: '#d4af37', // Gold
  INNER: '#4a90e2', // Blue
  OUTER: '#7ed321', // Green
};

const CitizenCompliance: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [currentCitizen, setCurrentCitizen] = useState<CitizenProfile | null>(null);
  const [score, setScore] = useState(0);
  const [demerits, setDemerits] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const generateCitizen = useCallback((): CitizenProfile => {
    const castes: ('CORE' | 'INNER' | 'OUTER')[] = ['CORE', 'INNER', 'OUTER'];
    const caste = castes[Math.floor(Math.random() * castes.length)];
    const idPrefix = Math.random() > 0.1 ? 'SM-' : 'XX-'; // 10% chance of fake ID
    const isInfected = Math.random() > 0.7; // 30% chance of infection
    const isExpired = Math.random() > 0.8; // 20% chance of expired ID
    const wrongSector = Math.random() > 0.85; // 15% chance of wrong sector for caste

    const sectorPool = wrongSector ? SECTORS.OUTER : SECTORS[caste];
    const sector = sectorPool[Math.floor(Math.random() * sectorPool.length)];

    return {
      id: `${idPrefix}${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `CITIZEN_${Math.floor(Math.random() * 10000)}`,
      caste,
      sector,
      expiry: isExpired ? 51 : 52 + Math.floor(Math.random() * 10),
      isInfected,
      photoSeed: Math.random(),
    };
  }, []);

  const nextCitizen = () => {
    setCurrentCitizen(generateCitizen());
    setIsScanning(false);
    setFeedback(null);
  };

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setDemerits(0);
    nextCitizen();
  };

  const handleDecision = (decision: 'APPROVE' | 'DETAIN') => {
    if (!currentCitizen || feedback) return;

    const isIllegal = 
      !currentCitizen.id.startsWith('SM-') || 
      currentCitizen.expiry < 52 || 
      currentCitizen.isInfected ||
      !SECTORS[currentCitizen.caste].includes(currentCitizen.sector);

    const isCorrect = (decision === 'APPROVE' && !isIllegal) || (decision === 'DETAIN' && isIllegal);

    if (isCorrect) {
      setScore(prev => prev + 100);
      setFeedback({ type: 'success', message: 'COMPLIANCE VERIFIED' });
    } else {
      setDemerits(prev => prev + 1);
      setFeedback({ type: 'error', message: 'PROTOCOL BREACH DETECTED' });
      if (demerits + 1 >= 3) {
        setGameState('GAMEOVER');
      }
    }

    setTimeout(() => {
      if (gameState === 'PLAYING') nextCitizen();
    }, 1500);
  };

  return (
    <div className="compliance-game-container gold-border">
      <div className="game-header">
        <div className="header-info">
          <Shield size={20} className="gold-text" />
          <span className="serif">ID_SCANNER_v4.2</span>
        </div>
        <div className="game-stats">
          <div className="stat-item">SCORE: {score}</div>
          <div className="stat-item demerits">DEMERITS: {demerits}/3</div>
        </div>
      </div>

      <div className="scanner-view">
        <AnimatePresence mode="wait">
          {gameState === 'IDLE' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="game-overlay"
            >
              <h3 className="serif gold-text">Station Checkpoint 7-B</h3>
              <div className="compliance-guide gold-border serif">
                <h4>VERIFICATION PROTOCOL v42:</h4>
                <ul>
                  <li>• ID PREFIX: MUST START WITH [ SM- ]</li>
                  <li>• EXPIRATION: MUST BE AFTER [ 51 AF ]</li>
                  <li>• CASTE: MUST MATCH SECTOR COLOR</li>
                  <li>• BIO-SCAN: HOVER FOR [ SHIMMER-SKIN ]</li>
                </ul>
              </div>
              <p>Failure to report infractions will result in immediate demerits.</p>
              <button onClick={startGame} className="button-mandate">Begin Inspection</button>
            </motion.div>
          )}

          {gameState === 'GAMEOVER' && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="game-overlay fatal"
            >
              <AlertTriangle size={48} color="#8b0000" />
              <h3 className="serif">CONTRACT TERMINATED</h3>
              <p>Reason: Excessive Protocol Breaches. You have been assigned to the Correction Centers.</p>
              <div className="final-score">FINAL RATING: {score}</div>
              <button onClick={startGame} className="button-mandate">Request Appeal</button>
            </motion.div>
          )}

          {gameState === 'PLAYING' && currentCitizen && (
            <motion.div 
              key={currentCitizen.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="id-card-wrap"
            >
              <div className="id-card">
                <div className="card-hologram" style={{ backgroundColor: CASTE_COLORS[currentCitizen.caste] }} />
                <div className="card-content">
                  <div className="photo-box">
                    <User size={60} className={`user-icon ${currentCitizen.isInfected ? 'infected' : ''}`} />
                    {isScanning && <div className="scan-line" />}
                  </div>
                  <div className="card-details">
                    <div className="detail-row">
                      <span className="label">ID:</span>
                      <span className="value">{currentCitizen.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">CASTE:</span>
                      <span className="value" style={{ color: CASTE_COLORS[currentCitizen.caste] }}>{currentCitizen.caste}</span>
                    </div>
                    <div className="detail-row">
                      <Calendar size={12} className="gold-text" />
                      <span className="value">EXP: Year {currentCitizen.expiry} AF</span>
                    </div>
                    <div className="detail-row">
                      <MapPin size={12} className="gold-text" />
                      <span className="value sector">{currentCitizen.sector}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="serif gold-text">LOYALTY_IS_LIFE</span>
                </div>
              </div>

              <div className="decision-controls">
                <button 
                  className="btn-decision approve" 
                  onClick={() => handleDecision('APPROVE')}
                  disabled={!!feedback}
                >
                  <CheckCircle size={20} /> APPROVE
                </button>
                <button 
                  className="btn-decision detain" 
                  onClick={() => handleDecision('DETAIN')}
                  disabled={!!feedback}
                >
                  <XCircle size={20} /> DETAIN
                </button>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`feedback-msg ${feedback.type}`}
                  >
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="scanner-footer">
        <button className="scan-trigger" onMouseEnter={() => setIsScanning(true)} onMouseLeave={() => setIsScanning(false)}>
          <Search size={14} /> HOVER_TO_BIO_SCAN
        </button>
      </div>
    </div>
  );
};

export default CitizenCompliance;
