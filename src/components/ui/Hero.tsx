'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';

interface HeroProps {
    onExplore: () => void;
}

// Typewriter text
const TYPEWRITER_TEXT = "Welcome to Motionry, wait for a minute to get magic...";

export function Hero({ onExplore }: HeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [showTypewriter, setShowTypewriter] = useState(false);

    // Handle button click - start animation sequence
    const handleButtonClick = useCallback(() => {
        if (isButtonClicked) return;
        setIsButtonClicked(true);
        setDisplayedText("");
    }, [isButtonClicked]);

    // Delay before showing typewriter (1 second after morph)
    useEffect(() => {
        if (!isButtonClicked) return;

        const delayTimer = setTimeout(() => {
            setShowTypewriter(true);
        }, 1000); // 1 second delay after morph

        return () => clearTimeout(delayTimer);
    }, [isButtonClicked]);

    // Typewriter effect with pause
    useEffect(() => {
        if (!showTypewriter) return;

        let isCancelled = false;

        const runTypewriter = async () => {
            const part1 = "Welcome to Motionry,";
            const part2 = " wait for a minute to get magic...";
            const fullText = part1 + part2;

            // Type first part
            for (let i = 0; i <= part1.length; i++) {
                if (isCancelled) return;
                setDisplayedText(part1.slice(0, i));
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Pause after comma
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Type second part
            for (let i = part1.length; i <= fullText.length; i++) {
                if (isCancelled) return;
                setDisplayedText(fullText.slice(0, i));
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Wait before navigation
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!isCancelled) onExplore();
        };

        runTypewriter();

        return () => { isCancelled = true; };
    }, [showTypewriter, onExplore]);

    // Initialize HLS.js for video streaming - lazy load for performance
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const videoSrc = 'https://customer-cbeadsgr09pnsezs.cloudflarestream.com/0f2f7fe2f6a205894f4e9747e26a7341/manifest/video.m3u8';

        // Dynamic import hls.js for better initial page load
        const initHls = async () => {
            const Hls = (await import('hls.js')).default;

            if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false, // Disable for smoother playback
                    startLevel: -1, // Auto quality selection based on bandwidth
                    maxBufferLength: 15, // Slightly higher buffer for smoother playback
                    maxMaxBufferLength: 30, // Cap max buffer
                    maxBufferSize: 30 * 1000 * 1000, // 30MB max buffer size
                    abrEwmaDefaultEstimate: 2000000, // Higher bandwidth estimate (2Mbps) for better initial quality
                    abrBandWidthFactor: 0.9, // Less conservative for faster quality upgrade
                    abrBandWidthUpFactor: 0.7, // Faster quality upgrades
                });
                hls.loadSource(videoSrc);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch(() => { });
                    setIsVideoLoaded(true);
                });

                return () => hls.destroy();
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari native HLS support
                video.src = videoSrc;
                video.addEventListener('loadedmetadata', () => {
                    video.play().catch(() => { });
                    setIsVideoLoaded(true);
                });
            }
        };

        initHls();
    }, []);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        willChange: 'auto',
                        transform: 'translateZ(0)',
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
                {/* Dark overlay - 80% for darker background */}
                <div className="absolute inset-0 bg-black/80" />

                {/* Loading placeholder while video loads */}
                {!isVideoLoaded && (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4 lg:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                    <span className="text-xs lg:text-sm text-white font-medium">Open Source Animation Library</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 lg:mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                    <span className="block">Micro</span>
                    <span className="block text-white/90">
                        Animations
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-base lg:text-lg xl:text-xl text-white/70 max-w-2xl mx-auto mb-6 lg:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    A curated collection of beautiful UI animations with AI-friendly prompts.
                    Copy the perfect animation for your next project in seconds.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.button
                        onClick={handleButtonClick}
                        className="relative overflow-hidden"
                        style={{
                            borderRadius: 28,
                        }}
                        layout
                        transition={{
                            layout: { type: "spring", stiffness: 100, damping: 20 }
                        }}
                        whileHover={!isButtonClicked ? { scale: 1.02 } : {}}
                        whileTap={!isButtonClicked ? { scale: 0.98 } : {}}
                        disabled={isButtonClicked}
                    >
                        {/* Border Beam Effect - only shows when clicked */}
                        <AnimatePresence>
                            {isButtonClicked && (
                                <motion.div
                                    className="absolute inset-0"
                                    layout
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1, rotate: 360 }}
                                    style={{
                                        borderRadius: 28,
                                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 80deg, rgba(255,255,255,0.6) 90deg, transparent 100deg, transparent 360deg)',
                                    }}
                                    transition={{
                                        opacity: { duration: 0.3 },
                                        rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Inner content */}
                        <motion.div
                            className={`relative flex items-center justify-center gap-2 text-base lg:text-lg h-[56px] min-w-[200px] ${isButtonClicked
                                ? 'bg-black/90 backdrop-blur-md text-white px-8 font-normal'
                                : 'bg-white hover:bg-gray-100 text-black px-6 font-semibold'
                                }`}
                            style={{
                                borderRadius: 28,
                                margin: isButtonClicked ? '1px' : '0',
                                boxShadow: isButtonClicked ? 'inset 0 0 0 1px rgba(255,255,255,0.1)' : 'none',
                            }}
                            layout
                            transition={{
                                layout: { type: "spring", stiffness: 100, damping: 20 }
                            }}
                        >
                            <AnimatePresence mode="popLayout">
                                {!isButtonClicked ? (
                                    <motion.div
                                        layout
                                        key="initial"
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Play className="w-4 h-4 lg:w-5 lg:h-5" />
                                        <span>Browse Library</span>
                                        <motion.span
                                            className="inline-block"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        layout
                                        key="typewriter"
                                        className="flex items-center gap-3 min-w-[300px] lg:min-w-[450px]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="text-sm lg:text-base text-white/80 font-light">
                                            {displayedText}
                                            <motion.span
                                                className="inline-block w-0.5 h-4 lg:h-5 bg-white/80 ml-0.5"
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-12 mt-8 lg:mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">15+</div>
                        <div className="text-xs lg:text-sm text-white/50">Animations</div>
                    </div>
                    <div className="w-px h-8 lg:h-10 bg-white/20" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">7</div>
                        <div className="text-xs lg:text-sm text-white/50">Categories</div>
                    </div>
                    <div className="w-px h-8 lg:h-10 bg-white/20" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">∞</div>
                        <div className="text-xs lg:text-sm text-white/50">Possibilities</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
