import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface TrackButtonProps {
    id:string;
    handleToggleTrack: ()=>void;
    isTracked: boolean;
}

const TrackButton = ({ id, isTracked, handleToggleTrack }:TrackButtonProps) => {
  const [particles, setParticles] = useState<any>([]);

  const handleClick = () => {
    if (!isTracked) {
      spawnParticles();
    }
    handleToggleTrack();
  };

  // Generate a burst of particles with random directions and distances
  const spawnParticles = () => {
    const newParticles = [];
    const particleCount = 8; // adjust as needed
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 40; // random distance between 20-50 pixels
      newParticles.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    }
    setParticles(newParticles);
  };

  // Clean up particles after the animation duration
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div className="justify-self-end whitespace-nowrap rounded-lg font-semibold" 
    style={{ position: "relative", display: "inline-block" }}>
      <motion.button
        onClick={handleClick}
        style={{
          padding: "5px 20px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: isTracked? "#FFCE1B" : "#64748B",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        {isTracked ? <RemoveCircleIcon className="mr-2"/> : <AddCircleIcon className="mr-2"/>}
        {isTracked ? "Untrack Exam" : "Add to Tracked Exams"}
      </motion.button>

      <AnimatePresence>
        {particles.map((p:any) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#FFEF00",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TrackButton;
