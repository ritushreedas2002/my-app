
//components/PageTransition/index.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import "./styles.css";

interface PageTransitionProps {
    children: React.ReactNode;
}

const routes: { [key: string]: string } = {
    "/": "Agency",
    "/src/home": "Projects",
    "/src/expertise": "Expertise",
    "/careers": "Careers",
    "/contact": "Contact"
};

const curve = (initialPath: string, targetPath: string) => ({
    initial: {
        d: initialPath
    },
    enter: {
        d: targetPath,
        transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        d: initialPath,
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    }
});

const text = {
    initial: {
        opacity: 1,
        y: 0
    },
    enter: {
        opacity: 0,
        y: -100,
        transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }
    }
};

interface SVGProps {
    width: number;
    height: number;
}

const SVG: React.FC<SVGProps> = ({ width, height }) => {
    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg
            initial={{ top: '-300px' }}
            animate={{ 
                top: '-100vh',
                transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
            }}
            exit={{ 
                top: '-300px',
                transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <motion.path
                fill="#1C1D20"
                variants={curve(initialPath, targetPath)}
                initial="initial"
                animate="enter"
                exit="exit"
            />
        </motion.svg>
    );
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0); // Add a key state

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        // Check for transition flag whenever pathname changes
        const checkTransition = () => {
            const shouldTransition = sessionStorage.getItem('navigateWithCurve') === 'true';
            if (shouldTransition) {
                setIsTransitioning(true);
                setKey(prev => prev + 1); // Increment key to force re-render
                // Remove the flag after a delay to ensure animation completes
                setTimeout(() => {
                    sessionStorage.removeItem('navigateWithCurve');
                    setIsTransitioning(false);
                }, 1500); // Adjust timing based on your animation duration
            }
        };

        checkTransition();
    }, [pathname]); // Run effect when pathname changes

    return (
        <>
            <AnimatePresence mode="wait">
                {isTransitioning && (
                    <motion.div 
                        key={key} // Add key to force re-render
                        className="page-transition"
                        initial={{ opacity: 1 }}
                        exit={{ opacity:0 }}
                    >
                        <motion.p 
                            className="route"
                            variants={text}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            {routes[pathname]}
                        </motion.p>
                        <SVG width={dimensions.width} height={dimensions.height} />
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </>
    );
}


