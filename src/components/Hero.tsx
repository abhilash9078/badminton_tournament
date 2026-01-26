import React, { useState, useEffect } from "react";
import { Trophy, Calendar, Users } from "lucide-react";

// Define enhanced animations with click effects
const customAnimations = `
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 15px 0 rgba(34, 211, 238, 0.4); }
    50% { box-shadow: 0 0 30px 10px rgba(34, 211, 238, 0.7); }
  }
  
  @keyframes flash-text {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes zoom-in-out {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes orbit {
    0% { transform: translateX(0) translateY(0) rotate(0); }
    25% { transform: translateX(15px) translateY(-15px) rotate(90deg); }
    50% { transform: translateX(0) translateY(-30px) rotate(180deg); }
    75% { transform: translateX(-15px) translateY(-15px) rotate(270deg); }
    100% { transform: translateX(0) translateY(0) rotate(360deg); }
  }

  @keyframes countdown-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
    50% { transform: scale(1.02); box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes badge-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
  }

  @keyframes coming-soon-glow {
    0%, 100% { 
      text-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3); 
      transform: scale(1);
    }
    50% { 
      text-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.5); 
      transform: scale(1.02);
    }
  }

  @keyframes wait-over-explosion {
    0% { 
      transform: scale(0.8) rotate(-5deg); 
      opacity: 0;
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
    }
    20% { 
      transform: scale(1.1) rotate(2deg); 
      opacity: 1;
      text-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(59, 130, 246, 0.6);
    }
    40% { 
      transform: scale(0.95) rotate(-1deg); 
      text-shadow: 0 0 40px rgba(34, 211, 238, 1), 0 0 80px rgba(59, 130, 246, 0.8);
    }
    60% { 
      transform: scale(1.05) rotate(1deg); 
      text-shadow: 0 0 50px rgba(34, 211, 238, 1), 0 0 100px rgba(59, 130, 246, 1);
    }
    100% { 
      transform: scale(1) rotate(0deg); 
      text-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(59, 130, 246, 0.6);
    }
  }

  @keyframes date-reveal {
    0% { 
      transform: translateY(50px) scale(0.5); 
      opacity: 0;
      filter: blur(10px);
    }
    50% { 
      transform: translateY(-10px) scale(1.1); 
      opacity: 0.8;
      filter: blur(2px);
    }
    100% { 
      transform: translateY(0) scale(1); 
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes sparkle {
    0%, 100% { 
      opacity: 0; 
      transform: scale(0) rotate(0deg);
    }
    50% { 
      opacity: 1; 
      transform: scale(1) rotate(180deg);
    }
  }

  @keyframes fireworks {
    0% { 
      transform: scale(0); 
      opacity: 1;
    }
    50% { 
      transform: scale(1.5); 
      opacity: 0.8;
    }
    100% { 
      transform: scale(3); 
      opacity: 0;
    }
  }

  @keyframes date-pulse {
    0%, 100% { 
      transform: scale(1); 
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(59, 130, 246, 0.3);
    }
    50% { 
      transform: scale(1.02); 
      box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 80px rgba(59, 130, 246, 0.6);
    }
  }

  /* New Click Animations */
  @keyframes click-ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }

  @keyframes click-scale {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }

  @keyframes click-glow {
    0% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
    50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4); }
    100% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
  }

  @keyframes click-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-8px) scale(1.02); }
    50% { transform: translateY(-4px) scale(1.01); }
    75% { transform: translateY(-2px) scale(1.005); }
  }

  @keyframes click-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px) rotate(-1deg); }
    75% { transform: translateX(2px) rotate(1deg); }
  }

  @keyframes click-pulse-card {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); }
    50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(34, 211, 238, 0.3); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
  }

  /* Animation Classes */
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-flash-text {
    animation: flash-text 3s ease-in-out infinite;
  }
  
  .animate-zoom {
    animation: zoom-in-out 4s ease-in-out infinite;
  }
  
  .animate-orbit {
    animation: orbit 12s linear infinite;
  }

  .animate-countdown-pulse {
    animation: countdown-pulse 2.5s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
  }

  .animate-badge-bounce {
    animation: badge-bounce 2s ease-in-out infinite;
  }

  .animate-coming-soon {
    animation: coming-soon-glow 3s ease-in-out infinite;
  }

  .animate-wait-over {
    animation: wait-over-explosion 2s ease-out;
  }

  .animate-date-reveal {
    animation: date-reveal 1.5s ease-out 0.5s both;
  }

  .animate-sparkle {
    animation: sparkle 2s ease-in-out infinite;
  }

  .animate-fireworks {
    animation: fireworks 3s ease-out infinite;
  }

  .animate-date-pulse {
    animation: date-pulse 2.5s ease-in-out infinite;
  }

  /* Click Animation Classes */
  .click-ripple {
    animation: click-ripple 0.6s ease-out;
  }

  .click-scale {
    animation: click-scale 0.15s ease-in-out;
  }

  .click-glow {
    animation: click-glow 0.5s ease-in-out;
  }

  .click-bounce {
    animation: click-bounce 0.6s ease-out;
  }

  .click-shake {
    animation: click-shake 0.5s ease-in-out;
  }

  .click-pulse-card {
    animation: click-pulse-card 0.4s ease-out;
  }

  /* Interactive Elements */
  .btn-primary {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn-primary:active::before {
    width: 300px;
    height: 300px;
  }

  .btn-secondary {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-secondary::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(34, 211, 238, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn-secondary:active::before {
    width: 300px;
    height: 300px;
  }

  .card-clickable {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-clickable:active {
    transform: translateY(2px);
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    .animate-orbit {
      animation: orbit 15s linear infinite;
    }
    .animate-countdown-pulse {
      animation: countdown-pulse 3s ease-in-out infinite;
    }
    
    .btn-primary:active::before,
    .btn-secondary:active::before {
      width: 200px;
      height: 200px;
    }
  }
`;

const Hero: React.FC = () => {
  // Tournament date: January 31st, 2026 at 8:30 AM
  const tournamentDate = new Date("2026-01-31T08:30:00").getTime();
  
  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false
  });

  // Update countdown every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = tournamentDate - now;

      if (distance < 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true
        });
      } else {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          isLive: false
        });
      }
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [tournamentDate]);

  // Click handlers for animations
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    button.classList.add("click-scale");
    setTimeout(() => button.classList.remove("click-scale"), 150);
  };

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    cardType: string
  ) => {
    const card = e.currentTarget;
    card.classList.add("click-pulse-card");
    setTimeout(() => card.classList.remove("click-pulse-card"), 400);

    // Optional: Add different actions based on card type
    console.log(`${cardType} card clicked!`);
  };

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const gallery = e.currentTarget;
    gallery.classList.add("click-bounce");
    setTimeout(() => gallery.classList.remove("click-bounce"), 600);
  };

  return (
    <section
      id="home"
      className="mt-5 relative min-h-screen flex items-center justify-center pt-16 pb-8 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: customAnimations }} />

      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-0">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
        {/* Pattern backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Optimized animated elements */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none opacity-60 sm:opacity-80">
        {/* Main orbital element */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-20 animate-orbit">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-sm"></div>
        </div>

        {/* Floating elements - simplified for better performance */}
        <div className="hidden sm:block absolute bottom-1/3 right-1/6 w-12 h-12 md:w-16 md:h-16 opacity-25 animate-float1">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-sm"></div>
        </div>

        <div className="hidden md:block absolute top-1/5 right-1/5 w-14 h-14 md:w-18 md:h-18 opacity-25 animate-float2">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-500 blur-sm"></div>
        </div>

        {/* Background glow circles */}
        <div className="absolute top-1/2 left-1/6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-cyan-500/5 animate-pulse-glow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-blue-500/5 animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center max-w-6xl">
        {/* The Wait is Over Section - Moved to Top */}
        <div className="mb-8 sm:mb-10 animate-slide-up relative">
          {/* Sparkle effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-sparkle" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-sparkle" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-sparkle" style={{ animationDelay: "1.5s" }}></div>
            <div className="absolute bottom-0 right-1/5 w-2 h-2 bg-cyan-500 rounded-full animate-sparkle" style={{ animationDelay: "2s" }}></div>
          </div>

          {/* Fireworks effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 animate-fireworks" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 animate-fireworks" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-16 left-20 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 opacity-60 animate-fireworks" style={{ animationDelay: "2s" }}></div>
          </div>

          <div className="relative z-10">
            {/* Main announcement */}
            <div className="animate-wait-over mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-orange-500 text-transparent bg-clip-text mb-2 tracking-wide">
                🎉 THE WAIT IS OVER! 🎉
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-4"></div>
            </div>

            {/* Date announcement */}
            <div className="animate-date-reveal">
              <div className="bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-purple-500/15 backdrop-blur-sm border-2 border-cyan-400/40 rounded-2xl p-6 sm:p-8 mx-auto max-w-lg animate-date-pulse shadow-2xl">
                <div className="text-center">
                  <p className="text-lg sm:text-xl text-cyan-200 font-semibold mb-2">
                    🗓️ TOURNAMENT DATE ANNOUNCED
                  </p>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-300 text-transparent bg-clip-text mb-2 drop-shadow-lg">
                    JAN 31
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">
                    2026
                  </div>
                  <div className="text-lg sm:text-xl text-cyan-200 font-medium">
                    SATURDAY
                  </div>
                  <div className="mt-4 text-base sm:text-lg text-red-400 font-bold">
                    🔒 Registration Closed 🔒
                  </div>
                  <a
                    href="/pools"
                    className="inline-block mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-h-[44px] flex items-center justify-center"
                    onClick={(e) => {
                      e.currentTarget.classList.add("click-scale");
                      setTimeout(() => e.currentTarget.classList.remove("click-scale"), 150);
                    }}
                  >
                    🏆 View Pools & Matches
                  </a>
                </div>
              </div>
            </div>

            {/* Countdown Timer or Live Status */}
            <div className="mt-6 animate-slide-up" style={{ animationDelay: "1s" }}>
              {timeRemaining.isLive ? (
                // Matches are Live
                <div className="bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-sm border-2 border-red-400/60 rounded-2xl p-6 sm:p-8 mx-auto max-w-2xl animate-pulse-glow shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text animate-flash-text">
                      🔴 MATCHES ARE LIVE! 🔴
                    </h3>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse ml-3"></div>
                  </div>
                  <p className="text-lg sm:text-xl text-white font-semibold mb-4">
                    The tournament is happening right now!
                  </p>
                  <a
                    href="/pools"
                    className="inline-block bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg min-h-[44px] flex items-center justify-center mx-auto max-w-xs"
                    onClick={(e) => {
                      e.currentTarget.classList.add("click-scale");
                      setTimeout(() => e.currentTarget.classList.remove("click-scale"), 150);
                    }}
                  >
                    📺 Watch Matches Live
                  </a>
                </div>
              ) : (
                // Countdown Timer
                <div className="bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-red-500/15 backdrop-blur-sm border-2 border-purple-400/40 rounded-2xl p-6 sm:p-8 mx-auto max-w-2xl animate-countdown-pulse shadow-2xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                    ⏰ Tournament Starts In:
                  </h3>
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {/* Days */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                        {timeRemaining.days}
                      </div>
                      <div className="text-xs sm:text-sm text-cyan-300 font-semibold mt-1">
                        Days
                      </div>
                    </div>
                    {/* Hours */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        {timeRemaining.hours}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-300 font-semibold mt-1">
                        Hours
                      </div>
                    </div>
                    {/* Minutes */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-red-400 text-transparent bg-clip-text">
                        {timeRemaining.minutes}
                      </div>
                      <div className="text-xs sm:text-sm text-pink-300 font-semibold mt-1">
                        Minutes
                      </div>
                    </div>
                    {/* Seconds */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">
                        {timeRemaining.seconds}
                      </div>
                      <div className="text-xs sm:text-sm text-orange-300 font-semibold mt-1">
                        Seconds
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 mt-4 font-medium">
                    Tournament begins at 8:30 AM on Saturday, January 31st
                  </p>
                </div>
              )}
            </div>

            {/* Excitement text */}
            <div className="mt-6 animate-slide-up" style={{ animationDelay: "1.2s" }}>
              <p className="text-lg sm:text-xl text-cyan-200 font-medium mb-2">
                🏆 Get Ready for Epic Battles! 🏆
              </p>
              <p className="text-base sm:text-lg text-white/90">
                Mark your calendars and prepare for the ultimate showdown!
              </p>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-[0.9] animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 text-transparent bg-clip-text animate-flash-text">
            Shuttle Showdown
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">
            4.0
          </span>
        </h1>

        {/* Quick Info Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Date Card */}
          <div
            className="card-clickable bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
            onClick={(e) => handleCardClick(e, "Date")}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">
                Date
              </span>
            </div>
            <p className="text-white text-sm sm:text-base font-medium">Jan 31, 2026</p>
            <p className="text-white/70 text-xs sm:text-sm">Saturday</p>
          </div>

          {/* Teams Card */}
          <div
            className="card-clickable bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
            onClick={(e) => handleCardClick(e, "Teams")}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm">Teams</span>
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              24 Teams
            </p>
            <p className="text-white/70 text-xs sm:text-sm">48 Players</p>
            <p className="text-white/50 text-xs sm:text-sm">5 Hours</p>
          </div>

          {/* Format Card */}
          <div
            className="card-clickable bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 sm:col-span-1 col-span-1"
            onClick={(e) => handleCardClick(e, "Format")}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm">
                Format
              </span>
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              Doubles
            </p>
            <p className="text-white/70 text-xs sm:text-sm">Pool + Knockout</p>
          </div>
        </div>

        {/* Subtitle */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-medium text-cyan-300 mb-6 sm:mb-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          The Ultimate Badminton Championship
        </h2>

        {/* Description */}
        <p
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          🔥 Elite competition, amazing prizes, and unforgettable moments await! 
          The countdown to glory begins now! 🔥
        </p>


        {/* CTA Section */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-10 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#about"
            className="btn-secondary group border-2 border-yellow-400/50 hover:border-yellow-400/70 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-yellow-400/10 min-w-[220px]"
            onClick={handleButtonClick}
          >
            📋 View Tournament Details
          </a>
        </div>

        {/* Gallery Link */}
        <div
          className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 animate-pulse-glow animate-slide-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex flex-col items-center">
            <p className="text-white/90 text-base mb-3 text-center">
              Want to see our champions?
            </p>
            <a
              href="#tournament-results"
              className="group flex flex-col items-center min-h-[44px] justify-center"
              onClick={handleGalleryClick}
            >
              <span className="text-cyan-300 text-lg font-semibold group-hover:text-white transition-all duration-300 group-hover:scale-110 mb-2 text-center">
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
