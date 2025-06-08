import React from 'react';
// import CountdownTimer from './CountdownTimer';

// Define new animations to be used in the component
const customAnimations = `
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 15px 0 rgba(34, 211, 238, 0.4); }
    50% { box-shadow: 0 0 30px 10px rgba(34, 211, 238, 0.7); }
  }
  
  @keyframes flash-text {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes zoom-in-out {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes orbit {
    0% { transform: translateX(0) translateY(0) rotate(0); }
    25% { transform: translateX(20px) translateY(-20px) rotate(90deg); }
    50% { transform: translateX(0) translateY(-40px) rotate(180deg); }
    75% { transform: translateX(-20px) translateY(-20px) rotate(270deg); }
    100% { transform: translateX(0) translateY(0) rotate(360deg); }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-flash-text {
    animation: flash-text 3s ease-in-out infinite;
  }
  
  .animate-zoom {
    animation: zoom-in-out 5s ease-in-out infinite;
  }
  
  .animate-orbit {
    animation: orbit 10s linear infinite;
  }
`;

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Inject custom animations */}
      <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
      
      {/* Background with pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-purple-800/95 z-0">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff08_1px,transparent_1px),linear-gradient(-45deg,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {/* Orbital shuttlecock */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 opacity-20 animate-orbit">
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
          </svg>
        </div>
        
        {/* Floating shuttlecocks */}
        <div className="absolute bottom-1/3 right-1/6 w-16 h-16 opacity-25 animate-float1">
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full transform rotate-45">
            <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
          </svg>
        </div>
        
        <div className="absolute top-1/5 right-1/5 w-20 h-20 opacity-25 animate-float2">
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full transform -rotate-12">
            <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
          </svg>
        </div>
        
        {/* Pulsing circles */}
        <div className="absolute top-1/2 left-1/6 w-32 h-32 rounded-full bg-cyan-500/5 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-500/5 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-6 inline-block animate-zoom">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-lg font-semibold px-4 py-1 rounded-full border border-cyan-400/30 animate-pulse">
            Coming Soon
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text animate-flash-text">
            Shuttle Showdown 3.0
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-cyan-300 mb-8">
          Bigger. Better. Faster.
        </h2>
        <p className="text-xl text-white mb-14 max-w-2xl mx-auto leading-relaxed">
          Stay tuned for our exciting new tournament format with incredible prizes, elite competition, and unforgettable moments!
        </p>
        
        {/* Enhanced past tournaments section */}
        <div className="mt-10 max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 animate-pulse-glow">
          <div className="flex flex-col items-center">
            <p className="text-white/90 text-lg mb-3">Want to see our champions?</p>
            <a 
              href="#about" 
              className="group flex flex-col items-center"
            >
              <span className="text-cyan-300 text-xl font-semibold group-hover:text-white transition-all duration-300 group-hover:scale-110 mb-2">
                View Past Tournaments Gallery
              </span>
              <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1 mt-2 group-hover:border-cyan-400 transition-colors duration-300">
                <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce mt-1 group-hover:bg-cyan-400"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;