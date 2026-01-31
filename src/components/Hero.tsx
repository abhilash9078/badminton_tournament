import React from "react";
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

  @keyframes celebration-glow {
    0%, 100% { 
      transform: scale(1); 
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(245, 158, 11, 0.4), 0 0 90px rgba(217, 119, 6, 0.3);
    }
    50% { 
      transform: scale(1.03); 
      box-shadow: 0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(245, 158, 11, 0.6), 0 0 150px rgba(217, 119, 6, 0.4);
    }
  }

  @keyframes trophy-shine {
    0% { 
      transform: rotate(-5deg) scale(1);
      filter: brightness(1);
    }
    25% { 
      transform: rotate(5deg) scale(1.05);
      filter: brightness(1.3);
    }
    50% { 
      transform: rotate(-3deg) scale(1.1);
      filter: brightness(1.5);
    }
    75% { 
      transform: rotate(3deg) scale(1.05);
      filter: brightness(1.3);
    }
    100% { 
      transform: rotate(-5deg) scale(1);
      filter: brightness(1);
    }
  }

  @keyframes confetti-fall {
    0% { 
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% { 
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  @keyframes thank-you-reveal {
    0% { 
      transform: translateY(50px) scale(0.8);
      opacity: 0;
      filter: blur(10px);
    }
    50% { 
      transform: translateY(-10px) scale(1.05);
      opacity: 0.8;
      filter: blur(2px);
    }
    100% { 
      transform: translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes golden-pulse {
    0%, 100% { 
      background-position: 0% 50%;
    }
    50% { 
      background-position: 100% 50%;
    }
  }

  @keyframes float1 {
    0%, 100% { 
      transform: translateY(0px) translateX(0px);
    }
    33% { 
      transform: translateY(-20px) translateX(10px);
    }
    66% { 
      transform: translateY(-10px) translateX(-10px);
    }
  }

  @keyframes float2 {
    0%, 100% { 
      transform: translateY(0px) translateX(0px);
    }
    50% { 
      transform: translateY(-30px) translateX(15px);
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

  .animate-celebration-glow {
    animation: celebration-glow 3s ease-in-out infinite;
  }

  .animate-trophy-shine {
    animation: trophy-shine 4s ease-in-out infinite;
  }

  .animate-confetti {
    animation: confetti-fall 5s linear infinite;
  }

  .animate-thank-you {
    animation: thank-you-reveal 1.5s ease-out forwards;
  }

  .animate-golden-pulse {
    animation: golden-pulse 3s ease-in-out infinite;
    background-size: 200% 200%;
  }

  .animate-float1 {
    animation: float1 6s ease-in-out infinite;
  }

  .animate-float2 {
    animation: float2 8s ease-in-out infinite;
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

  // Click handlers for animations
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.classList.add("click-pulse-card");
    setTimeout(() => card.classList.remove("click-pulse-card"), 400);
  };

  return (
    <section
      id="home"
      className="mt-5 relative min-h-screen flex items-center justify-center pt-16 pb-8 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: customAnimations }} />

      {/* Enhanced Background - Elegant Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-0">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
        {/* Pattern backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* Subtle golden accent overlay for celebration */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5"></div>
      </div>

      {/* Subtle Confetti Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5 opacity-40">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#fbbf24', '#f59e0b', '#f97316', '#34d399', '#60a5fa', '#a78bfa'][Math.floor(Math.random() * 6)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Optimized animated elements - Mixed theme */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none opacity-60 sm:opacity-80">
        {/* Main orbital element - Cyan/Blue */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-20 animate-orbit">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-sm"></div>
        </div>

        {/* Golden celebration element */}
        <div className="hidden sm:block absolute bottom-1/3 right-1/6 w-14 h-14 md:w-18 md:h-18 opacity-30 animate-float1">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 blur-md animate-pulse"></div>
        </div>

        {/* Purple element */}
        <div className="hidden md:block absolute top-1/5 right-1/5 w-14 h-14 md:w-18 md:h-18 opacity-25 animate-float2">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-500 blur-sm"></div>
        </div>

        {/* Background glow circles - Mixed */}
        <div className="absolute top-1/2 left-1/6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-cyan-500/5 animate-pulse-glow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-blue-500/5 animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        ></div>
        {/* Golden accent glow */}
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-yellow-500/8 animate-celebration-glow"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center max-w-6xl">
        {/* Thank You Section */}
        <div className="mb-8 sm:mb-10 animate-thank-you relative">
          {/* Golden sparkle effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-sparkle" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-sparkle" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle" style={{ animationDelay: "1.5s" }}></div>
            <div className="absolute bottom-0 right-1/5 w-3 h-3 bg-amber-500 rounded-full animate-sparkle" style={{ animationDelay: "2s" }}></div>
          </div>

          {/* Celebration fireworks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-70 animate-fireworks" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-20 right-16 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-70 animate-fireworks" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-16 left-20 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 opacity-70 animate-fireworks" style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-70 animate-fireworks" style={{ animationDelay: "1.5s" }}></div>
          </div>

          <div className="relative z-10">
            {/* Trophy Icon */}
            <div className="mb-6 flex justify-center animate-trophy-shine">
              <div className="text-8xl sm:text-9xl md:text-[12rem]">🏆</div>
            </div>

            {/* Main Thank You Message */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 text-transparent bg-clip-text animate-golden-pulse">
                Thank You!
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-2">
                Tournament Completed Successfully
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-yellow-200 font-semibold">
                January 31, 2026
              </p>
            </div>

            {/* Celebration Card */}
            <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-md border-2 border-yellow-400/50 rounded-3xl p-8 sm:p-10 md:p-12 mx-auto max-w-3xl animate-celebration-glow shadow-2xl">
                <div className="text-center space-y-6">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed">
                    🎉 We extend our heartfelt gratitude to all participants, supporters, and organizers who made this tournament a grand success! 🎉
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-yellow-100 font-normal">
                    Your passion, sportsmanship, and dedication made this event truly memorable.
                  </p>
                  
                  {/* View Score Cards Button */}
                  <div className="pt-6">
                    <a
                      href="/pools"
                      className="inline-block bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl hover:shadow-yellow-500/50 text-lg sm:text-xl min-h-[56px] flex items-center justify-center animate-golden-pulse"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #f97316 100%)',
                      }}
                      onClick={(e) => {
                        e.currentTarget.classList.add("click-scale");
                        setTimeout(() => e.currentTarget.classList.remove("click-scale"), 150);
                      }}
                    >
                      <span className="mr-2 text-2xl">📊</span>
                      View Score Cards & Results
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Thank You Message */}
            <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <p className="text-lg sm:text-xl text-yellow-200 font-medium mb-3">
                🙏 Thank you for being part of this incredible journey! 🙏
              </p>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                We hope you enjoyed every moment of the competition. See you at the next tournament!
              </p>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-[0.9] animate-slide-up"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 text-transparent bg-clip-text animate-flash-text">
            Shuttle Showdown
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">
            4.0
          </span>
        </h1>

        {/* Tournament Stats Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "1.1s" }}
        >
          {/* Date Card */}
          <div
            className="card-clickable bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl p-5 border-2 border-yellow-400/40 hover:border-yellow-400/60 hover:bg-yellow-500/30 transition-all duration-300 shadow-lg"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Calendar className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-300 font-bold text-base">
                Tournament Date
              </span>
            </div>
            <p className="text-white text-lg sm:text-xl font-bold mb-1">Jan 31, 2026</p>
            <p className="text-yellow-200 text-sm sm:text-base">Successfully Completed</p>
          </div>

          {/* Teams Card */}
          <div
            className="card-clickable bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-5 border-2 border-amber-400/40 hover:border-amber-400/60 hover:bg-amber-500/30 transition-all duration-300 shadow-lg"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Users className="w-6 h-6 text-amber-300" />
              <span className="text-amber-300 font-bold text-base">Participants</span>
            </div>
            <p className="text-white text-lg sm:text-xl font-bold mb-1">
              24 Teams
            </p>
            <p className="text-amber-200 text-sm sm:text-base">48 Players Competed</p>
          </div>

          {/* Format Card */}
          <div
            className="card-clickable bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-5 border-2 border-orange-400/40 hover:border-orange-400/60 hover:bg-orange-500/30 transition-all duration-300 shadow-lg"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Trophy className="w-6 h-6 text-orange-300" />
              <span className="text-orange-300 font-bold text-base">
                Format
              </span>
            </div>
            <p className="text-white text-lg sm:text-xl font-bold mb-1">
              Doubles
            </p>
            <p className="text-orange-200 text-sm sm:text-base">Pool + Knockout</p>
          </div>
        </div>

        {/* Subtitle */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-medium text-yellow-200 mb-6 sm:mb-8 animate-slide-up"
          style={{ animationDelay: "1.2s" }}
        >
          The Ultimate Badminton Championship
        </h2>

        {/* Final Message */}
        <p
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up"
          style={{ animationDelay: "1.3s" }}
        >
          ✨ A celebration of skill, determination, and sportsmanship! ✨
        </p>
      </div>
    </section>
  );
};

export default Hero;
