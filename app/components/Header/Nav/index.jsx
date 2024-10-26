
'use client';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { slideIn } from "./anim";
import { Poppins } from 'next/font/google';
import { useRouter, usePathname } from 'next/navigation';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '600',
    style: 'normal',
});



export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = async (href, e) => {
        e.preventDefault();
        
        // Only trigger transition if navigating to a different route
        if (href !== pathname) {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('navigateWithCurve', 'true');
                // Add a small delay before navigation to ensure flag is set
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            router.push(href);
        }
    };

    return (
        <div className={styles.nav}>
            <div className={styles.body}>
                {links.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <div key={`b_${i}`} className={`${poppins.className} ${styles.linkContainer}`}>
                            <motion.div
                                custom={i}
                                variants={slideIn}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                            >
                                <a 
                                    href={href} 
                                    onClick={(e) => handleClick(href, e)}
                                    className={pathname === href ? styles.active : ''}
                                >
                                    {title}
                                </a>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
            <motion.div className={styles.footer}>
                {footerLinks.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.a
                            href={href}
                            onClick={(e) => handleClick(href, e)}
                            variants={slideIn}
                            custom={i}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            className={pathname === href ? styles.active : ''}
                        >
                            {title}
                        </motion.a>
                    );
                })}
            </motion.div>
        </div>
    );
}