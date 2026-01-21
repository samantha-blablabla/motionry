'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GeometricShapesProps {
    className?: string;
    color1?: string;
    color2?: string;
    children?: React.ReactNode;
}

export function GeometricShapes({
    className,
    color1 = '#6366f1',
    color2 = '#ec4899',
    children,
}: GeometricShapesProps) {

    return (
        <div className={cn("relative w-full h-full bg-[#0a0a0b] overflow-hidden", className)}>

            {/* Abstract Gradient Glows */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[100px]"
                style={{ background: color1 }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[100px]"
                style={{ background: color2 }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -50, 0],
                    opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Floating Geometric SVGs */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color1} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color2} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Large Rotating Icosahedron-like shape */}
                <motion.path
                    d="M100,50 L150,150 L50,150 Z"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                        opacity: 1,
                        translateX: [0, 30, 0],
                        translateY: [0, 20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ x: '20%', y: '20%', scale: 3 }}
                />

                {/* Floating Circles */}
                <motion.circle
                    cx="80%" cy="30%" r="50"
                    stroke={color2} strokeWidth="1" fill="none"
                    animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.rect
                    x="30%" y="70%" width="80" height="80"
                    stroke={color1} strokeWidth="1" fill="none"
                    animate={{ rotate: 360, y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* 3D Glass Morphism Element */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10"
                style={{
                    background: `linear-gradient(135deg, ${color1}11, ${color2}11)`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                }}
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.05, 1],
                    borderRadius: ["50%", "40%", "50%"]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-12 rounded-full border border-white/5" />
            </motion.div>


            {/* Content */}
            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}
