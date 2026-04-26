import React from "react";
import { Trophy, Calendar, Users, Camera, BarChart3 } from "lucide-react";

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

  /* Season finale — thank you & gallery */
  @keyframes gold-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes trophy-float {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-14px) rotate(3deg); }
  }

  @keyframes frame-glow {
    0%, 100% {
      box-shadow: 0 0 24px rgba(250, 204, 21, 0.35), 0 0 48px rgba(245, 158, 11, 0.2), inset 0 0 36px rgba(255,255,255,0.06);
    }
    50% {
      box-shadow: 0 0 48px rgba(250, 204, 21, 0.7), 0 0 80px rgba(217, 119, 6, 0.35), inset 0 0 56px rgba(255,255,255,0.1);
    }
  }

  @keyframes aurora-shift {
    0%, 100% { opacity: 0.5; transform: translateX(-5%) scale(1); }
    50% { opacity: 0.85; transform: translateX(5%) scale(1.05); }
  }

  @keyframes soft-breathe {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.03); opacity: 1; }
  }

  .animate-gold-shimmer {
    background: linear-gradient(
      105deg,
      rgba(254, 243, 199, 0.12) 0%,
      rgba(251, 191, 36, 0.35) 45%,
      rgba(253, 230, 138, 0.2) 50%,
      rgba(251, 191, 36, 0.35) 55%,
      rgba(254, 243, 199, 0.12) 100%
    );
    background-size: 220% 100%;
    animation: gold-shimmer 5s linear infinite;
  }

  .animate-trophy-float {
    animation: trophy-float 5s ease-in-out infinite;
  }

  .animate-frame-glow {
    animation: frame-glow 3.2s ease-in-out infinite;
  }

  .animate-aurora {
    animation: aurora-shift 14s ease-in-out infinite;
  }

  .animate-soft-breathe {
    animation: soft-breathe 4s ease-in-out infinite;
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
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.classList.add("click-pulse-card");
    setTimeout(() => card.classList.remove("click-pulse-card"), 400);
  };

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.add("click-scale");
    setTimeout(() => e.currentTarget.classList.remove("click-scale"), 150);
  };

  return (
    <section
      id="home"
      className="mt-5 relative min-h-screen flex items-center justify-center pt-16 pb-12 sm:pb-16 overflow-hidden scroll-mt-20"
    >
      <style dangerouslySetInnerHTML={{ __html: customAnimations }} />

      {/* Deep celebration backdrop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-fuchsia-600/10 to-cyan-500/15 animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:22px_22px] opacity-60" />
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(135deg,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none opacity-50 sm:opacity-70 z-[1]">
        <div className="absolute top-[18%] left-[12%] w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-amber-400/20 blur-2xl animate-soft-breathe" />
        <div
          className="absolute bottom-[22%] right-[10%] w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-fuchsia-500/15 blur-3xl animate-soft-breathe"
          style={{ animationDelay: "1.2s" }}
        />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 opacity-30 animate-orbit hidden md:block">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-300/40 to-orange-500/30 blur-md" />
        </div>
      </div>

      {/* Light confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2] opacity-35 sm:opacity-45">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-confetti"
            style={{
              left: `${(i * 7.3) % 100}%`,
              backgroundColor: [
                "#fbbf24",
                "#f472b6",
                "#34d399",
                "#60a5fa",
                "#c084fc",
              ][i % 5],
              animationDelay: `${(i % 5) * 0.7}s`,
              animationDuration: `${4.5 + (i % 3) * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center max-w-6xl relative">
        <div className="mb-6 sm:mb-8 animate-thank-you">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/15 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md shadow-lg animate-badge-bounce">
            <span className="text-lg" aria-hidden>
              ✨
            </span>
            <span className="text-amber-100 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              Season 5.0 wrapped
            </span>
          </div>
        </div>

        <div
          className="mb-6 flex justify-center animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative inline-block animate-trophy-float">
            <div className="text-7xl sm:text-8xl md:text-9xl drop-shadow-[0_0_35px_rgba(251,191,36,0.45)]">
              🏆
            </div>
            <div className="absolute -inset-4 rounded-full bg-amber-400/20 blur-2xl -z-10 animate-pulse-glow" />
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-300 text-transparent bg-clip-text animate-flash-text">
            Thank you, everyone
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-amber-100/95 font-semibold mb-2 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Shuttle Showdown <span className="text-white">5.0</span> is complete
        </p>

        <p
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/85 mb-8 sm:mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.28s" }}
        >
          Your dedication, energy, and sportsmanship made this season
          unforgettable. We are deeply grateful to every player, partner,
          volunteer, and fan who showed up and gave their best.
        </p>

        <div
          className="mx-auto max-w-3xl rounded-3xl border border-amber-400/35 bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl mb-8 sm:mb-10 animate-slide-up animate-frame-glow"
          style={{ animationDelay: "0.35s" }}
        >
          <p className="text-white text-base sm:text-lg md:text-xl font-medium mb-2">
            Stay tuned for the next season
          </p>
          <p className="text-amber-100/80 text-sm sm:text-base mb-6">
            We will be back with more rallies, rivalries, and memories. Until
            then, relive the results and the winner moments below.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <a
              href="/#gallery"
              onClick={handleGalleryClick}
              className="btn-primary group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 px-8 py-4 text-base sm:text-lg font-bold text-slate-900 shadow-xl transition hover:scale-[1.03] active:scale-95 min-h-[52px] w-full sm:w-auto overflow-hidden"
            >
              <span className="absolute inset-0 animate-gold-shimmer opacity-60 pointer-events-none" />
              <Camera className="relative z-10 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="relative z-10">Winner gallery</span>
            </a>
            <a
              href="/pools"
              onClick={handleGalleryClick}
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/35 bg-white/10 px-8 py-4 text-base sm:text-lg font-bold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/50 hover:scale-[1.02] active:scale-95 min-h-[52px] w-full sm:w-auto"
            >
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              Scores &amp; pools
            </a>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.55s" }}
        >
          <div
            className="card-clickable rounded-xl border border-amber-400/35 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-6 h-6 text-amber-300" />
              <span className="font-bold text-amber-200 text-sm sm:text-base">
                Season 5.0
              </span>
            </div>
            <p className="text-white font-semibold">April 26, 2026</p>
            <p className="text-white/70 text-sm mt-1">
              Thank you for being there
            </p>
          </div>
          <div
            className="card-clickable rounded-xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <span className="font-bold text-yellow-100 text-sm sm:text-base">
                Format
              </span>
            </div>
            <p className="text-white font-semibold">Doubles</p>
            <p className="text-white/70 text-sm mt-1">Pools + knockout</p>
          </div>
          <div
            className="card-clickable rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-5 backdrop-blur-sm transition hover:bg-emerald-500/20"
            onClick={handleCardClick}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-emerald-300" />
              <span className="font-bold text-emerald-200 text-sm sm:text-base">
                Status
              </span>
            </div>
            <p className="text-white font-semibold">Tournament complete</p>
            <p className="text-emerald-100/90 text-sm mt-1">
              See you next season
            </p>
          </div>
        </div>

        <p
          className="text-sm sm:text-base text-white/70 max-w-xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.65s" }}
        >
          Tip: open the gallery for official winner photos (Season 5.0 first),
          then browse scores anytime from Pools.
        </p>
      </div>
    </section>
  );
};

export default Hero;
