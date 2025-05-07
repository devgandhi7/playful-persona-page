
import React, { useState } from "react";
import { cn } from "@/lib/utils";

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
      <div className="bg-game-dark/90 backdrop-blur-md rounded-lg border border-game-accent/30 overflow-hidden">
        <div className="bg-game-blue/40 px-4 py-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-game-accent hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="p-4 max-h-60 md:max-h-80 overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
