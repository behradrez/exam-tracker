import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon  from "@mui/icons-material/StarBorder"

interface StarButtonProps {
    id:string;
    handleToggleTrack: (examTerm:string)=>void;
    isTracked: (examTerm:string) => boolean;
}

const StarButton = ({id, handleToggleTrack, isTracked}:StarButtonProps) => {
  const [particles, setParticles] = useState<any>([]);

  const handleClick = () => {
    if (!isTracked(id)) {
      spawnParticles();
    }
    handleToggleTrack(id);
  };

  const spawnParticles = () => {
    const newParticles = [];
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 20;
      newParticles.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
      <div style={{ position: "relative"}}>
        {isTracked(id) ? (
          <StarIcon
            style={{ color: "#FFDB58", cursor: "pointer" }}
            onClick={handleClick}
          />
        ) : (
          <StarBorderIcon
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
        )}

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

export default StarButton;
