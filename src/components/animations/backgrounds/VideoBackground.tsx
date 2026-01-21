'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Hls from 'hls.js';

interface VideoBackgroundProps {
    className?: string;
    src?: string;
    poster?: string;
    overlayOpacity?: number;
    overlayColor?: string;
    children?: React.ReactNode;
}

export function VideoBackground({
    className,
    src = 'https://customer-cbeadsgr09pnsezs.cloudflarestream.com/74cb72d57c6a6d6d7807693d02e6707b/manifest/video.m3u8',
    poster,
    overlayOpacity = 0.5,
    overlayColor = '#000000',
    children,
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Intersection Observer to only load/play when in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        // Initialize HLS if needed and not already loaded
                        if (Hls.isSupported() && src.endsWith('.m3u8')) {
                            if (!hlsRef.current) {
                                const hls = new Hls({
                                    capLevelToPlayerSize: true, // Optimize quality based on size
                                    autoStartLoad: true
                                });
                                hlsRef.current = hls;
                                hls.loadSource(src);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                                    setIsLoaded(true);
                                    video.play().catch(() => { });
                                });
                            } else {
                                video.play().catch(() => { });
                            }
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            // Safari Native HLS
                            video.src = src;
                            setIsLoaded(true);
                            video.play().catch(() => { });
                        } else {
                            // Standard MP4
                            video.src = src;
                            setIsLoaded(true);
                            video.play().catch(() => { });
                        }
                        setIsPlaying(true);

                    } else {
                        // Pause/Cleanup when out of view
                        if (video) {
                            video.pause();
                            setIsPlaying(false);
                        }
                    }
                });
            },
            { rootMargin: '100px' } // Preload slightly before appearing
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [src]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
            <video
                ref={videoRef}
                className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-1000", isLoaded ? 'opacity-100' : 'opacity-0')}
                poster={poster}
                muted
                loop
                playsInline
            />
            {/* Loading State or Fallback */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
            />

            {/* Content */}
            <div className="relative z-[2] w-full h-full">
                {children}
            </div>
        </div>
    );
}
