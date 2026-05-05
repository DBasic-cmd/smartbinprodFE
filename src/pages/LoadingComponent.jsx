import React from 'react';

const LoadingComponent = () => {
  // Planet configuration with minimum 70px distance from sun
  // 4 out of 5 planets rotate counter-clockwise (negative speed values)
  const planets = [
    { size: 'w-1 h-1', orbitRadius: 70, speed: 12, angle: 0 },     // Counter-clockwise
    { size: 'w-3 h-3', orbitRadius: 90, speed: 18, angle: 40 },    // Counter-clockwise
    { size: 'w-3 h-3', orbitRadius: 110, speed: 27, angle: 80 },   // Counter-clockwise
    { size: 'w-3 h-3', orbitRadius: 130, speed: 35, angle: 120 },  // Counter-clockwise
    { size: 'w-7 h-7', orbitRadius: 150, speed: 48, angle: 160 },   // Clockwise
    { size: 'w-4 h-4', orbitRadius: 170, speed: 52, angle: 200 },  // Counter-clockwise
    { size: 'w-4 h-4', orbitRadius: 190, speed: 60, angle: 240 },  // Counter-clockwise
    { size: 'w-5 h-5', orbitRadius: 210, speed: -72, angle: 280 },  // Counter-clockwise
    { size: 'w-1 h-1', orbitRadius: 230, speed: 84, angle: 320 },   // Clockwise
  ];

  return (
    <div className="fixed inset-0 bg-green-700 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        .sun-container {
          animation: rotate 30s linear infinite;
        }
        
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: white;
          filter: blur(1px);
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .planet {
          filter: blur(0.5px);
          animation: motion-blur 0.5s infinite alternate;
        }
        
        @keyframes motion-blur {
          0% { filter: blur(0.5px); }
          100% { filter: blur(1.5px); }
        }
        
        ${planets.map((_, i) => `
          .planet-orbit-${i + 1} {
            animation: orbit-${i + 1} ${Math.abs(planets[i].speed) / 10}s linear infinite;
            ${planets[i].speed < 0 ? 'animation-direction: reverse;' : ''}
          }
          
          @keyframes orbit-${i + 1} {
            0% {
              transform: rotate(${planets[i].angle}deg) translateX(${planets[i].orbitRadius}px) rotate(-${planets[i].angle}deg);
            }
            100% {
              transform: rotate(${planets[i].angle + 360}deg) translateX(${planets[i].orbitRadius}px) rotate(-${planets[i].angle + 360}deg);
            }
          }
        `).join('')}
      `}</style>

      <div className="relative w-[500px] h-[500px]">
        {/* Central Sun */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="sun-container w-16 h-16 md:w-20 md:h-20 relative">
            <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-white/30 rounded-full filter blur-[2px] opacity-30 animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="hexagon w-10 h-10 md:w-12 md:h-12"></div>
            </div>
          </div>
        </div>

        {/* Orbiting Planets */}
        {planets.map((planet, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 planet-orbit-${i + 1}`}
          >
            <div className={`${planet.size} rounded-full bg-white planet`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingComponent;