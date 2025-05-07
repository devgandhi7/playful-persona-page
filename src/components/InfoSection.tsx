
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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("animate-fade-in");
    } else {
      setAnimationClass("animate-fade-out");
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this with your animation duration
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  const positionClasses = {
    left: "left-4 right-auto md:left-12",
    right: "right-4 left-auto md:right-12",
    center: "left-1/2 -translate-x-1/2"
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-20 md:bottom-32 w-full max-w-md px-4 z-30 transition-all duration-500",
        positionClasses[position],
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div 
        className={cn(
          "bg-game-dark/95 backdrop-blur-md rounded-2xl border border-game-accent/30 overflow-hidden shadow-xl",
          "transform transition-all duration-300",
          animationClass,
          "shadow-game-purple/30"
        )}
      >
        <div className="bg-gradient-to-r from-game-blue to-game-purple px-5 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white glow-text">{title}</h3>
          <button 
            onClick={onClose}
            className="text-game-accent hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 max-h-[70vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
