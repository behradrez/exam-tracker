'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";


function useWordCycle(words:string[], interval:number) {
  const [index, setIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      setIndex(Math.floor(Math.random() * words.length));
      setIsInitial(false);
      return;
    }

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval, isInitial]);

  return words[index];
}

interface AnimateWordsProps {
    words: string[];
    delay?: number;
    wordDelay?: number;
    className?:string;
}

export function AnimateWords({words, delay=0.015, wordDelay=2100, className=""}:AnimateWordsProps) {
  const word = useWordCycle(words, wordDelay);

  return (
    <div
    style={{display: "inline-block"}}
    className={className}
    >
    <AnimatePresence mode="wait">
        {word?.split("").map((char, index) => (
          <motion.span
            key={`${word}-${char}-${index.toString()}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{
              duration: 0.15,
              delay: index * delay,
              ease: "easeOut",
            }}
            style={{ 
                display: "inline-block", 
                whiteSpace: "pre", 
                fontSize: 30
            }}
          >
            {char}
          </motion.span>
        ))}
    </AnimatePresence>
    </div>
  );
}