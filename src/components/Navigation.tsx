
import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";

interface NavigationProps {
  onRestart: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onRestart, onToggleMute, isMuted }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Gamepad2 className="h-6 w-6 mr-2 text-game-purple" />
        <h1 className="text-xl font-bold text-white glow-text">My Portfolio</h1>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-game-accent px-4 py-2 rounded-md text-sm border border-game-accent/20 hover:border-game-accent/60 transition-all"
        >
          Controls
        </button>
        
        <button
          onClick={onToggleMute}
          className="text-game-accent px-4 py-2 rounded-md text-sm border border-game-accent/20 hover:border-game-accent/60 transition-all"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        
        <button
          onClick={onRestart}
          className="bg-game-purple text-white px-4 py-2 rounded-md text-sm glowing-btn"
        >
          Restart
        </button>
      </div>
      
      {showControls && (
        <div className="absolute top-16 right-4 bg-game-dark/90 p-4 rounded-lg border border-game-accent/30 backdrop-blur-sm">
          <h3 className="text-game-purple font-bold mb-2">Controls:</h3>
          <ul className="text-sm text-game-accent space-y-1">
            <li>WASD - Move character</li>
            <li>SPACE - Jump / Interact</li>
            <li>ESC - Pause</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
