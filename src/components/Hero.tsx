import React from 'react';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/90 z-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      {/* Animated shuttlecocks */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 opacity-20 animate-float1">
        <div className="w-full h-full rounded-full border-8 border-white"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/3 w-12 h-12 opacity-20 animate-float2">
        <div className="w-full h-full rounded-full border-6 border-white"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Shuttle Showdown
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-orange-400 mb-8">
          Anup's Edition
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Internal Friendly Tournament • Regular Doubles
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
            <div className="text-sm uppercase tracking-wide">Date & Time</div>
            <div className="font-semibold">8th June 2025, Sunday</div>
            <div>8:00 AM - 12:00 PM</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
            <div className="text-sm uppercase tracking-wide">Location</div>
            <div className="font-semibold">RAMs Sports Arena</div>
            <div>Badminton Courts</div>
          </div>
        </div>
        
        <CountdownTimer targetDate="2025-06-08T08:00:00" />
        
        <div className="mt-10">
          <a 
            href="#about" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;