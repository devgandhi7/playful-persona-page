
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Loading assets...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const messages = [
      "Loading assets...",
      "Building world...",
      "Placing character...",
      "Almost ready...",
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        setMessage(msg);
      }, index * 1000);
    });

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-game-dark flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center glow-text mb-8">
          Interactive Portfolio
        </h2>
        
        <div className="relative h-2 bg-game-blue rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-game-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-game-accent">
          <span>{message}</span>
          <span>{progress}%</span>
        </div>
        
        <p className="text-center text-sm text-game-accent/70 mt-8">
          Use WASD to move and SPACE to interact
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
