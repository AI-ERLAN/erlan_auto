
import React from 'react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <div className="relative overflow-hidden min-h-[800px] flex items-center text-white px-4">
      {/* Background Image with Dark Professional Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-indigo-950/80"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full py-20">
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] drop-shadow-2xl">
            {t.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 font-medium drop-shadow leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Realistic 3D Globe Section */}
        <div className="relative flex items-center justify-center h-[550px] md:h-[650px]">
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
            
            {/* Atmospheric Glow */}
            <div className="absolute inset-[-60px] rounded-full bg-emerald-500/5 blur-[80px] animate-pulse"></div>
            <div className="absolute inset-[-20px] rounded-full border border-white/5 pointer-events-none"></div>
            
            {/* The Globe Core */}
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[inset_-60px_-60px_120px_rgba(0,0,0,0.9),inset_60px_60px_120px_rgba(255,255,255,0.05),0_0_80px_rgba(16,185,129,0.1)] bg-[#010409] border border-white/10">
              
              {/* Rotating Real Map Layer */}
              <div 
                className="absolute inset-0 w-[300%] h-full opacity-80"
                style={{
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/world-map.png")',
                  backgroundSize: '33.33% 100%',
                  animation: 'rotateGlobe 60s linear infinite',
                  filter: 'brightness(1.2) contrast(1.1) sepia(0.2) hue-rotate(110deg) saturate(1.5)'
                }}
              ></div>

              {/* Shading / Shadow Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/90 via-transparent to-white/5"></div>
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
            </div>

            {/* Trajectory and Markers Layer (SVG) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Path A to B */}
                <path 
                  id="deliveryPath"
                  d="M 150 240 Q 255 140 360 230" 
                  fill="none" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="2" 
                  strokeDasharray="6,4"
                  className="opacity-40"
                />

                {/* Point: Georgia */}
                <g className="point-a">
                  <circle cx="150" cy="240" r="15" fill="rgba(16,185,129,0.15)" className="animate-ping" />
                  <circle cx="150" cy="240" r="5" fill="#10b981" filter="url(#glow)" />
                  <rect x="100" y="255" width="100" height="24" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.2)" />
                  <text x="150" y="271" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" className="uppercase tracking-widest">{t.georgia}</text>
                  <image href="https://flagcdn.com/w40/ge.png" x="140" y="215" width="20" height="12" />
                </g>

                {/* Point: Kyrgyzstan */}
                <g className="point-b">
                  <circle cx="360" cy="230" r="15" fill="rgba(16,185,129,0.15)" className="animate-ping" style={{animationDelay: '1s'}} />
                  <circle cx="360" cy="230" r="5" fill="#10b981" filter="url(#glow)" />
                  <rect x="310" y="245" width="110" height="24" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.2)" />
                  <text x="365" y="261" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" className="uppercase tracking-widest">{t.kyrgyzstan}</text>
                  <image href="https://flagcdn.com/w40/kg.png" x="350" y="205" width="20" height="12" />
                </g>

                {/* Moving Transport Object (The Car) */}
                <g>
                  {/* Motion Animation for the entire group */}
                  <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#deliveryPath" />
                  </animateMotion>
                  
                  {/* Glowing dot representing the position */}
                  <circle r="3" fill="white" filter="url(#glow)" />
                  
                  {/* The Car Icon - Flipped to face forward (since emoji 🚗 faces left by default) */}
                  <g transform="scale(-1, 1)">
                    <text 
                      fontSize="28" 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      y="-12"
                      className="drop-shadow-lg"
                    >
                      🚗
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Bottom HUD info */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 whitespace-nowrap opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
               <div className="flex flex-col items-center">
                 <span>{t.georgia} (GE)</span>
                 <span className="text-emerald-400">Departure</span>
               </div>
               <div className="w-12 h-px bg-white/20"></div>
               <div className="flex flex-col items-center">
                 <span>{t.kyrgyzstan} (KG)</span>
                 <span className="text-emerald-400">Destination</span>
               </div>
            </div>

            {/* Rotation Legend */}
            <div className="absolute top-4 right-4 text-[9px] font-bold opacity-30 uppercase tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-earth-americas animate-spin duration-[10s]"></i>
               Real-time Global Sync
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotateGlobe {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .point-a text, .point-b text {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default Hero;
