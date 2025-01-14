"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

// Function to generate random RGB color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
};

export const TypewriterEffect = ({
  words = [],
  className,
  cursorClassName,
}: {
  words?: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [color1, setColor1] = useState(getRandomColor());
  const [color2, setColor2] = useState(getRandomColor());

  // Update colors every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColor1(getRandomColor());
      setColor2(getRandomColor());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    if (wordsArray.length === 0) {
      return null;
    }

    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `opacity-0 hidden`,
                    word.className || ""
                  )}
                  style={{
                    color: `${color1}`,
                    textShadow: '0 0 5px rgba(255,255,255,0.5)',
                    transition: "color 0.5s ease",
                  }}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-center p-4 rounded-lg bg-white",
        className || ""
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10",
          cursorClassName || ""
        )}
        style={{
          background: `linear-gradient(to right, ${color1}, ${color2})`,
          boxShadow: '0 0 5px rgba(255,255,255,0.5)',
          transition: "background 0.5s ease",
        }}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words = [],
  className,
  cursorClassName,
}: {
  words?: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [color1, setColor1] = useState(getRandomColor());
  const [color2, setColor2] = useState(getRandomColor());

  // Update colors every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColor1(getRandomColor());
      setColor2(getRandomColor());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => {
    if (wordsArray.length === 0) {
      return null;
    }

    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(word.className || "")}
                  style={{
                    color: `${color1}`,
                    textShadow: '0 0 5px rgba(255,255,255,0.5)',
                    transition: "color 0.5s ease",
                  }}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6 p-4 rounded-lg bg-white-800", className || "")}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12",
          cursorClassName || ""
        )}
        style={{
          background: `linear-gradient(to right, ${color1}, ${color2})`,
          boxShadow: '0 0 5px rgba(255,255,255,0.5)',
          transition: "background 0.5s ease",
        }}
      ></motion.span>
    </div>
  );
};

