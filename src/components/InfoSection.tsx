
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface InfoSectionProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'center';
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  content, 
  isOpen, 
  onClose,
  position = 'center' 
}) => {
  const [animationClass, setAnimationClass] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      setAnimationClass("animate-fade-in");
    } else {
      setAnimationClass("animate-fade-out");
    }
  }, [isOpen]);

  const positionClasses = {
    left: "left-4 right-auto md:left-12",
    right: "right-4 left-auto md:right-12",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div 
      className={cn(
        "fixed bottom-20 md:bottom-32 w-full max-w-md px-4 transition-all duration-500 z-30",
        positionClasses[position],
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div 
        className={cn(
          "bg-game-dark/95 backdrop-blur-md rounded-lg border border-game-accent/30 overflow-hidden shadow-lg",
          "transform transition-all duration-500",
          animationClass
        )}
      >
        <div className="bg-gradient-to-r from-game-blue/60 to-game-purple/60 px-4 py-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white glow-text">{title}</h3>
          <button 
            onClick={onClose}
            className="text-game-accent hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
