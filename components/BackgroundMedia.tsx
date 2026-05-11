"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { config } from "@/config";
import { Volume2, VolumeX } from "lucide-react";

export function BackgroundMedia() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    // Load saved preference
    const savedState = localStorage.getItem("music-playing");
    if (savedState === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = config.music.volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    localStorage.setItem("music-playing", newState.toString());
  };

  return (
    <>
      {/* Background Image */}
      <div className="fixed inset-0 z-[-1] bg-zinc-950">
        <Image
          src={config.background.image}
          alt="Background"
          fill
          priority
          className="object-cover blur-[2px] brightness-90"
        />
      </div>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src={config.music.src}
        loop
        preload="auto"
      />

      {/* Floating Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-3 bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md rounded-full text-zinc-300 hover:text-white transition-all duration-200 border border-zinc-700/50 shadow-lg"
        aria-label="Toggle background music"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  );
}
