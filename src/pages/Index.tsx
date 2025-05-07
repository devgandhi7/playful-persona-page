
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Linkedin, Mail, Phone } from "lucide-react";

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
      toast.success("Welcome to Dev Gandhi's interactive portfolio!", {
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
                  <div className="flex flex-col items-center mb-6">
                    <h2 className="text-2xl font-bold text-game-purple mb-2">Dev Gandhi</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Chapel Hill, NC</span>
                      <span className="text-game-accent/50">|</span>
                      <div className="flex items-center gap-1">
                        <Phone size={14} className="text-game-purple" />
                        <span>+1-9195930948</span>
                      </div>
                      <span className="text-game-accent/50">|</span>
                      <div className="flex items-center gap-1">
                        <Mail size={14} className="text-game-purple" />
                        <a href="mailto:devg@unc.edu" className="hover:text-game-purple">devg@unc.edu</a>
                      </div>
                      <span className="text-game-accent/50">|</span>
                      <div className="flex items-center gap-1">
                        <Linkedin size={14} className="text-game-purple" />
                        <a href="#" className="hover:text-game-purple">LinkedIn</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-game-blue/20 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-game-purple mb-3">Education</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-bold">University of North Carolina at Chapel Hill</h4>
                      <div className="flex justify-between text-sm">
                        <span>Masters of Science in Information Science</span>
                        <span className="text-game-purple">2026</span>
                      </div>
                      <div className="text-xs text-game-accent/70">NC, USA</div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold">Shri Ramdeobaba College of Engineering and Management</h4>
                      <div className="flex justify-between text-sm">
                        <span>Bachelor of Engineering in Electronics Engineering</span>
                        <span className="text-game-purple">2023</span>
                      </div>
                      <div className="text-xs text-game-accent/70">MH, India</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-game-purple mt-4">Technical Skills</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Programming Languages:</span> Python, SQL, R, NoSQL, C#, C++
                    </div>
                    <div>
                      <span className="font-semibold">Cloud & Databases:</span> Snowflake, AWS, Azure Cloud, Postgres, MySQL, MongoDB, Databricks, BigQuery
                    </div>
                    <div>
                      <span className="font-semibold">ETL/BI tools:</span> DBT, AWS Glue, Airbyte, PowerBI, Tableau, Fivetran, Looker, Apache Superset, Meltano
                    </div>
                    <div>
                      <span className="font-semibold">Other tools/Frameworks:</span> Pyspark, Git, Pandas, Numpy, Hadoop, Jupyter, JIRA, Confluence, Azure DevOps, Github
                    </div>
                  </div>
                </div>
              }
            />
            
            <InfoSection 
              title="Experience"
              isOpen={activeSection === "projects"}
              onClose={() => setActiveSection(null)}
              position="center"
              content={
                <div className="text-game-accent space-y-6">
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">Renaissance Computing Institute & NC Museum of Natural Sciences</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">01/2025 - Present</span>
                    </div>
                    <h5 className="font-semibold mb-2">Data Science Research Assistant</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Built an end-to-end machine learning pipeline for large-scale genomic annotation, processing 2.5M+ crowdsourced labels from Zooniverse with OpenCV and TensorFlow improving white blood cell subtype classification accuracy by 35%.</li>
                      <li>Built a vector database for high-dimensional genomic embeddings using FAISS and Weaviate, enabling 50% faster similarity searches for cell morphology and subtype identification in genetic data research.</li>
                      <li>Designed an anomaly detection framework using Isolation Forest and DBSCAN to flag and exclude 15% of inconsistent annotations, improving training dataset integrity for hematology ML models.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">School of Information and Library Science, UNC</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">08/2024 - 12/2024</span>
                    </div>
                    <h5 className="font-semibold mb-2">Carolina Technology Associate</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Designed and implemented a log analytics system using Splunk, centralizing system logs, creating real-time alerting pipelines, and building interactive dashboards, reducing incident response time by 40%.</li>
                      <li>Deployed and managed a Linux-based server for Snipe-IT, automating IT asset tracking with MySQL database integration, optimizing data retrieval by 25%, and ensuring 99.9% system uptime.</li>
                      <li>Automated server maintenance and security monitoring, implementing firewall rules, access controls, and shell scripts for updates and backups, reducing manual effort by 50%.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">Sportians FC</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">07/2023 - 07/2024</span>
                    </div>
                    <h5 className="font-semibold mb-2">Data Analyst</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Analyzed 100,000+ user activity logs with Python (Pandas, Matplotlib, Scipy) to uncover behavioral patterns, enabling targeted retention strategies that boosted user retention by 15%.</li>
                      <li>Collaborated with product and operations teams to translate data insights into A/B testing strategies, directly influencing feature deployment and user engagement decisions.</li>
                      <li>Led an agile BI team of 4 interns, driving the development of dynamic visualizations on Tableau to dissect transactional data and monitor KPIs, resulting in a 5% optimization in asset allocation.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">Finding Pi PVT. LTD.</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">01/2023 - 07/2023</span>
                    </div>
                    <h5 className="font-semibold mb-2">Data Analyst Intern</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Conducted root-cause analysis for declining product engagement using SQL and cohort analysis, presenting actionable insights to leadership and driving UX changes.</li>
                      <li>Designed and maintained relational data models in PostgreSQL and Snowflake, enabling self-serve analytics and cutting down ad hoc data requests by 40%.</li>
                      <li>Built custom KPI dashboards with drill-downs in Power BI to track product usage, onboarding conversion rates, and user acquisition trends, influencing quarterly OKRs.</li>
                    </ul>
                  </div>
                </div>
              }
            />
            
            <InfoSection 
              title="Projects"
              isOpen={activeSection === "contact"}
              onClose={() => setActiveSection(null)}
              position="right"
              content={
                <div className="text-game-accent space-y-6">
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">Human Detection using Machine Learning</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">06/2022 - 12/2022</span>
                    </div>
                    <div className="text-xs mb-2 italic">
                      <a href="#" className="text-game-purple hover:underline flex items-center gap-1">
                        <span>Published Research Paper</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                    <div className="text-sm mb-2">BE Project, Prof. Lokesh Heda, Shri Ramdeobaba College of Engineering and Management</div>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Led a machine learning project using YOLO v3, v4, and v5, improving detection accuracy by 30%, and implemented models with TensorFlow and PyTorch.</li>
                      <li>Engineered a data pipeline for real-time video collection and preprocessing, ensuring quality and consistency, and presented findings to stakeholders for data-driven decisions.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-game-blue/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-game-purple">College Prospectus Chatbot</h4>
                      <span className="text-sm bg-game-purple/20 px-2 py-1 rounded">01/2023 - 03/2023</span>
                    </div>
                    <div className="text-sm mb-2">Experimental Project, Mr Shashank Garg, CEO at Infocepts</div>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Created a chatbot using the Langchain framework and integrated retrieval-augmented generation (RAG) techniques to provide real-time responses based on academic data.</li>
                      <li>Developed and optimized prompts for user queries, applying prompt engineering techniques to improve LLM response quality and consistency.</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-4">
                      <a href="mailto:devg@unc.edu" className="flex items-center gap-2 bg-game-blue/30 hover:bg-game-blue/50 text-white px-4 py-2 rounded-full transition-colors">
                        <Mail size={16} />
                        <span>Email Me</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 bg-game-purple/30 hover:bg-game-purple/50 text-white px-4 py-2 rounded-full transition-colors">
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    </div>
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
