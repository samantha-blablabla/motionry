'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Play } from 'lucide-react';

interface HeroProps {
    onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
                    lowLatencyMode: true,
                    startLevel: -1, // Auto quality selection
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60,
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

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.button
                        onClick={onExplore}
                        className="group flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-base lg:text-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Play className="w-4 h-4 lg:w-5 lg:h-5" />
                        Browse Library
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>

                    <motion.a
                        href="https://github.com/samantha-blablabla/motionry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-xl border border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-base lg:text-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                        View on GitHub
                    </motion.a>
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
