'use client';
import {motion,useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
export default function MotionCard({children,className='',index=0}:{children:ReactNode;className?:string;index?:number}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:30,scale:.97}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.1}} whileHover={reduce?undefined:{y:-8,rotateX:2,rotateY:-2}} transition={{duration:.5,delay:Math.min(index,8)*.065}} style={{transformPerspective:950}}>{children}</motion.div>;
}
