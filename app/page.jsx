
"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { useRouter } from "next/navigation";

const Loading = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [completedWords, setCompletedWords] = useState(new Set());
  const links = ["Twitter", "Linkedin", "Facebook", "Instagram"];
  const router = useRouter();


  useEffect(() => {
    // Start the animation after a short delay
    const startTimeout = setTimeout(() => {
      setActiveIndex(0);
    }, 500);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < links.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (activeIndex === links.length - 1) {
      // When animation completes, navigate to /home
      const navigateTimer = setTimeout(() => {
        router.push("/src/home");
        
      }, 1000);

      return () => clearTimeout(navigateTimer);
    }
  }, [activeIndex, router]);

  useEffect(() => {
    if (activeIndex >= 0) {
      const timer = setTimeout(() => {
        setCompletedWords((prev) => new Set([...prev, activeIndex]));
      }, DURATION * 1000);

      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <section className="grid place-content-center gap-2 bg-green-300 px-8 py-24 text-black">
      {links.map((link, idx) => (
        <FlipLink 
          key={link} 
          href="#" 
          isAnimating={idx === activeIndex}
          isFilled={completedWords.has(idx)}
        >
          {link}
        </FlipLink>
      ))}
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ 
  children, 
  href, 
  isAnimating,
  isFilled 
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isAnimating) {
      animate(
        ".top span",
        { y: [0, "-110%"] },
        { duration: DURATION, delay: stagger(STAGGER) }
      );
      animate(
        ".bottom span",
        { y: ["100%", 0] },
        { duration: DURATION, delay: stagger(STAGGER) }
      );
    }
  }, [isAnimating, animate]);

  const outlineStyle = {
    WebkitTextStroke: "2px black",
    textStroke: "2px black",
  };

  return (
    <motion.a
      ref={scope}
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{ lineHeight: 1 }}
    >
      <div className="top">
        {children.split("").map((l, i) => (
          <span
            className="inline-block text-transparent"
            style={outlineStyle}
            key={`top-${i}`}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="bottom absolute inset-0">
        {children.split("").map((l, i) => (
          <span
            className={`inline-block ${isFilled ? "text-black" : "text-transparent"}`}
            style={!isFilled ? outlineStyle : {}}
            key={`bottom-${i}`}
          >
            {l}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

export default Loading;
