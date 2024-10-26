// 'use client';
// import { useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion';
// import Button from './Button';
// import styles from './style.module.scss';
// import Nav from './Nav';

// const menu = {
//     open: {
//         width: "480px",
//         height: "650px",
//         top: "-25px",
//         right: "-25px",
//         transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
//     },
//     closed: {
//         width: "100px",
//         height: "40px",
//         top: "0px",
//         right: "0px",
//         transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
//     }
// }

// export default function Index() {
//     const [isActive, setIsActive] = useState(false);

//     return (
//         <div className={styles.header}>
//             <motion.div 
//                 className={styles.menu}
//                 variants={menu}
//                 animate={isActive ? "open" : "closed"}
//                 initial="closed"
//             >
//                 <AnimatePresence>
//                     {isActive && <Nav />}
//                 </AnimatePresence>
//             </motion.div>
//             <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
//         </div>
//     )
// }


'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import styles from './style.module.scss';
import Nav from './Nav';


const menuVariants = (isMobile) => ({
    open: {
        width: isMobile ? "90vw" : "480px",
        height: isMobile ? "90vh" : "650px",
        top: isMobile ? "0px" : "-25px",
        right: isMobile ? "0px" : "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
});

export default function Index() {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); 
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.header}>
            <motion.div
                className={styles.menu}
                variants={menuVariants(isMobile)}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => { setIsActive(!isActive); }} />
        </div>
    );
}
