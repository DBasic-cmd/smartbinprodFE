import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-green-700 flex items-center justify-center overflow-hidden">
            <style jsx>{`
        .sun-container {
          animation: rotate 20s linear infinite;
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
        
        .planet-orbit-1 { animation: orbit-1 15s linear infinite; transform-origin: center; }
        .planet-orbit-2 { animation: orbit-2 18s linear infinite; transform-origin: center; }
        .planet-orbit-3 { animation: orbit-3 21s linear infinite; transform-origin: center; }
        .planet-orbit-4 { animation: orbit-4 24s linear infinite; transform-origin: center; }
        .planet-orbit-5 { animation: orbit-5 27s linear infinite; transform-origin: center; }
        .planet-orbit-6 { animation: orbit-6 30s linear infinite; transform-origin: center; }
        .planet-orbit-7 { animation: orbit-7 33s linear infinite; transform-origin: center; }
        .planet-orbit-8 { animation: orbit-8 36s linear infinite; transform-origin: center; }
        .planet-orbit-9 { animation: orbit-9 39s linear infinite; transform-origin: center; }
        
        @keyframes orbit-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orbit-2 { 0% { transform: rotate(60deg); } 100% { transform: rotate(420deg); } }
        @keyframes orbit-3 { 0% { transform: rotate(120deg); } 100% { transform: rotate(480deg); } }
        @keyframes orbit-4 { 0% { transform: rotate(180deg); } 100% { transform: rotate(540deg); } }
        @keyframes orbit-5 { 0% { transform: rotate(240deg); } 100% { transform: rotate(600deg); } }
        @keyframes orbit-6 { 0% { transform: rotate(300deg); } 100% { transform: rotate(660deg); } }
        @keyframes orbit-7 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes orbit-8 { 0% { transform: rotate(90deg); } 100% { transform: rotate(-270deg); } }
        @keyframes orbit-9 { 0% { transform: rotate(180deg); } 100% { transform: rotate(-180deg); } }
      `}</style>

            <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Central Sun */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="sun-container w-16 h-16 md:w-20 md:h-20 relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 bg-white rounded-full filter blur-[2px] opacity-80 animate-ping"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="hexagon w-10 h-10 md:w-12 md:h-12"></div>
                        </div>
                    </div>
                </div>

                {/* Orbiting Planets */}
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 planet-orbit-${i + 1}`}
                    >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div
                                className={`planet w-${Math.min(2 + i % 4, 6)} h-${Math.min(2 + i % 4, 6)} md:w-${Math.min(3 + i % 4, 8)} md:h-${Math.min(3 + i % 4, 8)} rounded-full bg-white`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;