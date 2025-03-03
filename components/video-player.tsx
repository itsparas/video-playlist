"use client";

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ src, poster, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load Video.js dynamically on the client side
    const loadVideoJs = async () => {
      try {
        const videojs = (await import('video.js')).default;
        // Import CSS
        await import('video.js/dist/video-js.css');
        
        if (videoRef.current) {
          const player = videojs(videoRef.current, {
            controls: true,
            autoplay: autoPlay,
            preload: 'auto',
            fluid: true,
            responsive: true,
            playbackRates: [0.5, 1, 1.5, 2],
            sources: [{ src, type: 'video/mp4' }],
            poster,
          });

          // Clean up on unmount
          return () => {
            if (player) {
              player.dispose();
            }
          };
        }
      } catch (error) {
        console.error('Error loading Video.js:', error);
      }
    };

    loadVideoJs();
  }, [src, poster, autoPlay]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-theme-city"
        playsInline
      />
    </div>
  );
}