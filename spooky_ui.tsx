import React, { useState, useEffect, useRef } from 'react';
import { Eye, AlertTriangle } from 'lucide-react';

export default function SpookyUI() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const audioRef = useRef(null);

  const jumpscare = () => {
    setShowJumpscare(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setShowJumpscare(false), 800);
  };

  const handleInteraction = () => {
    if (Math.random() < 0.2) {
      jumpscare();
    }
    
    if (Math.random() < 0.3) {
      setButtonsDisabled(true);
      setTimeout(() => setButtonsDisabled(false), 2000);
    }
    
    if (Math.random() < 0.4) {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 500);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        jumpscare();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col" style={{
      backgroundImage: 'url(https://login.microsoftonline.com/images/backgrounds/2_9c36a6340b5644de97b1a3c0d201ae6c.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAAAAAAA" />
      
      {/* Spooky floating eyes */}
      <div 
        className="fixed pointer-events-none z-10 opacity-20"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          transition: 'all 0.5s ease'
        }}
      >
        <Eye className="text-red-600 animate-pulse" size={40} />
      </div>

      {/* Glitch jumpscare overlay */}
      {showJumpscare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900">
          <div className="text-9xl animate-pulse">
            <AlertTriangle className="text-yellow-400" size={300} />
          </div>
          <div className="absolute inset-0 bg-black opacity-60 animate-ping" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" style={{
            backgroundSize: '200% 100%',
            animation: 'glitchSweep 0.3s ease-in-out infinite'
          }} />
          <style>{`
            @keyframes glitchSweep {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Sign In Box */}
          <div className="bg-white shadow-2xl p-12">
            {/* Penn State Logo */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900 rounded-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-800">PennState</span>
              </div>
            </div>

            <div className="mb-8">
              <h1 className={`text-2xl font-normal text-gray-800 ${glitchText ? 'animate-pulse blur-sm' : ''}`}>
                Sign in
              </h1>
            </div>
            
            <div className="space-y-1">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-b-2 border-gray-300 px-0 py-2 text-gray-900 focus:border-blue-600 focus:outline-none text-base placeholder-gray-500"
                  onClick={handleInteraction}
                  onFocus={handleInteraction}
                  disabled={buttonsDisabled}
                  placeholder={buttonsDisabled ? "LOCKED..." : "userid@psu.edu"}
                />
              </div>
              
              <div className="pt-4 pb-6">
                <a href="#" onClick={handleInteraction} className="text-sm text-blue-600 hover:underline">
                  Can't access your account?
                </a>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleInteraction}
                  disabled={buttonsDisabled}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 font-normal transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buttonsDisabled ? 'Processing...' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom sections */}
          <div className="mt-4 bg-white shadow-lg p-4 text-center">
            <p className="text-sm text-gray-700">Log in to your Penn State Account</p>
          </div>

          <div className="mt-4 bg-white shadow-lg p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50" onClick={handleInteraction}>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className={`text-sm font-medium text-gray-800 ${glitchText ? 'blur-sm' : ''}`}>Sign-in options</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-transparent py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-end items-center gap-6 text-xs text-white">
          <a href="#" onClick={handleInteraction} className={`hover:underline ${glitchText ? 'blur-sm' : ''}`}>Terms of Use</a>
          <a href="#" onClick={handleInteraction} className="hover:underline">Privacy</a>
          <button className="hover:underline" onClick={handleInteraction}>...</button>
          <div className="opacity-0">
            <Eye size={12} className="animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}