import React from 'react';
// import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-purple-800/95 z-0">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff08_1px,transparent_1px),linear-gradient(-45deg,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      {/* Animated shuttlecocks */}
      <div className="absolute top-1/5 left-1/6 w-20 h-20 opacity-20 animate-bounce-slow">
        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
          <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 right-1/6 w-16 h-16 opacity-20 animate-float2">
        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full transform rotate-45">
          <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
        </svg>
      </div>
      
      <div className="absolute top-1/3 right-1/5 w-14 h-14 opacity-20 animate-float1">
        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full transform -rotate-12">
          <path d="M12,7a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V8A1,1,0,0,0,12,7Zm0-3a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12,4ZM5,12a7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-6 inline-block">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-lg font-semibold px-4 py-1 rounded-full border border-cyan-400/30 animate-pulse">
            Coming Soon
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text">
            Shuttle Showdown 2.0
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-cyan-300 mb-8">
          Bigger. Better. Faster.
        </h2>
        <p className="text-xl text-white mb-14 max-w-2xl mx-auto leading-relaxed">
          Stay tuned for our exciting new tournament format with incredible prizes, elite competition, and unforgettable moments!
        </p>
        
        {/* Enhanced past tournaments section */}
        <div className="mt-10 max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
          <div className="flex flex-col items-center">
            <p className="text-white/90 text-lg mb-3">Want to see our champions?</p>
            <a 
              href="#about" 
              className="group flex flex-col items-center"
            >
              <span className="text-cyan-300 text-xl font-semibold group-hover:text-white transition-colors duration-300 mb-2">
                View Past Tournaments Gallery
              </span>
              <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1 mt-2">
                <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce mt-1"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;