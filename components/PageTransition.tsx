'use client';
import {motion,useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
export default function PageTransition({children}:{children:ReactNode}){const reduce=useReducedMotion();return <motion.div initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduce?0:.45}}>{children}</motion.div>}
