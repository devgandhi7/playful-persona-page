
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import GameCanvas from "@/components/GameCanvas";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Show welcome message when game loads
    if (!isLoading) {
      toast.success("Welcome to my interactive portfolio!", {
        description: "Use WASD to move and E to interact with colored spots",
        duration: 5000,
      });
    }
  }, [isLoading]);

  const handleInteract = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Add haptic feedback if available
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Sound enabled" : "Sound muted");
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {isLoading ? (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      ) : (
        <>
          {/* 3D Game Canvas */}
          <div className="absolute inset-0">
            <GameCanvas onInteract={handleInteract} />
          </div>
          
          {/* UI Layer */}
          <div className="absolute inset-0 pointer-events-none game-ui">
            <Navigation 
              onRestart={handleRestart}
              onToggleMute={handleToggleMute}
              isMuted={isMuted}
            />
            
            {/* Mobile Controls Overlay (simplified) */}
            <div className="md:hidden absolute bottom-4 right-4 flex flex-col gap-2">
              <button 
                className="w-12 h-12 bg-game-blue/80 rounded-full text-white border border-game-accent/30"
              >
                W
              </button>
              <div className="flex gap-2">
                <button 
                  className="w-12 h-12 bg-game-blue/80 rounded-full text-white border border-game-accent/30"
                >
                  A
                </button>
                <button 
                  className="w-12 h-12 bg-game-blue/80 rounded-full text-white border border-game-accent/30"
                >
                  S
                </button>
                <button 
                  className="w-12 h-12 bg-game-blue/80 rounded-full text-white border border-game-accent/30"
                >
                  D
                </button>
              </div>
            </div>

            <div className="md:hidden absolute bottom-4 left-4">
              <button 
                className="w-16 h-16 bg-game-purple/80 rounded-full text-white border border-game-accent/30"
              >
                E
              </button>
            </div>
            
            {/* Information sections */}
            <InfoSection 
              title="About Me"
              isOpen={activeSection === "about"}
              onClose={() => setActiveSection(null)}
              position="left"
              content={
                <div className="text-game-accent space-y-4">
                  <p>
                    I'm a passionate developer with expertise in web development, 3D graphics, 
                    and interactive experiences. My background spans multiple disciplines including
                    frontend development, creative coding, and user experience design.
                  </p>
                  <p>
                    I love creating immersive digital experiences that blend technical skill with 
                    artistic vision. When not coding, you can find me exploring new technologies,
                    hiking, or playing indie games.
                  </p>
                  <h4 className="text-game-purple font-bold text-lg mt-4">Skills</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>React, Three.js, WebGL</li>
                    <li>TypeScript, JavaScript</li>
                    <li>3D Modeling and Animation</li>
                    <li>UI/UX Design</li>
                    <li>Interactive Storytelling</li>
                  </ul>
                </div>
              }
            />
            
            <InfoSection 
              title="Projects"
              isOpen={activeSection === "projects"}
              onClose={() => setActiveSection(null)}
              position="center"
              content={
                <div className="text-game-accent space-y-4">
                  <div className="mb-4 pb-4 border-b border-game-accent/20">
                    <h4 className="text-game-purple font-bold">Interactive Portfolio</h4>
                    <p className="text-sm">A 3D interactive experience showcasing my work and skills.</p>
                    <div className="mt-2 flex space-x-2">
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">Three.js</span>
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">React</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-game-accent/20">
                    <h4 className="text-game-purple font-bold">Data Visualization Dashboard</h4>
                    <p className="text-sm">Interactive charts and graphs for complex data analysis.</p>
                    <div className="mt-2 flex space-x-2">
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">D3.js</span>
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">SVG</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-game-accent/20">
                    <h4 className="text-game-purple font-bold">AR Product Viewer</h4>
                    <p className="text-sm">Augmented reality application for product visualization.</p>
                    <div className="mt-2 flex space-x-2">
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">WebXR</span>
                      <span className="bg-game-blue/50 text-xs px-2 py-1 rounded">AR.js</span>
                    </div>
                  </div>
                </div>
              }
            />
            
            <InfoSection 
              title="Contact"
              isOpen={activeSection === "contact"}
              onClose={() => setActiveSection(null)}
              position="right"
              content={
                <div className="text-game-accent space-y-4">
                  <p>
                    I'm always interested in new opportunities and collaborations.
                    Feel free to reach out through any of the channels below:
                  </p>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">Email:</span>
                      <a href="mailto:example@domain.com" className="text-game-purple hover:underline">
                        example@domain.com
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">LinkedIn:</span>
                      <a href="#" className="text-game-purple hover:underline">
                        linkedin.com/in/yourname
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">GitHub:</span>
                      <a href="#" className="text-game-purple hover:underline">
                        github.com/yourusername
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">Twitter:</span>
                      <a href="#" className="text-game-purple hover:underline">
                        @yourusername
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-game-accent/20">
                    <p className="text-sm">
                      Currently {new Date().toLocaleDateString()} - Open to freelance opportunities and full-time positions!
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
