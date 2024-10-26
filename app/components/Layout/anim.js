// anim.js
export const curveVariants = (initialPath, targetPath, shouldAnimateCurve) => ({
    initial: {
        d: initialPath,
    },
    enter: {
        d: targetPath,
        transition: shouldAnimateCurve
            ? {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
            }
            : { duration: 0 },
    },
});

export const translate = (shouldAnimateCurve) => ({
    initial: {
        top: shouldAnimateCurve ? '-300px' : '0px',
    },
    enter: {
        top: '0px',
        transition: shouldAnimateCurve
            ? {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
            }
            : { duration: 0 },
    },
});
