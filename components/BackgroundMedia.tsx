"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { config } from "@/config";
import { Volume2, VolumeX, Volume1, Music } from "lucide-react";

export function BackgroundMedia() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [musicData, setMusicData] = useState<{ src: string; title: string; artist: string; volume: number; autoplay: boolean } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasSetStartTime = useRef(false);
  
  useEffect(() => {
    fetch("/api/music")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error("Music API Error:", data.error);
          return;
        }
        setMusicData(data);
        setVolume(data.volume);
      })
      .catch(err => console.error("Failed to fetch music data:", err));
  }, []);

  // Initial mount logic
  useEffect(() => {
    if (!musicData) return;
    const audio = audioRef.current;
    if (audio && !hasSetStartTime.current) {
      audio.currentTime = 0;
      hasSetStartTime.current = true;
      
      // Attempt autoplay
      if (musicData.autoplay) {
        audio.play().then(() => {
          setIsPlaying(true);
          setIsExpanded(true);
        }).catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction.");
        });
      }
    }
  }, [musicData]);

  useEffect(() => {
    // Global listener for first interaction
    const handleFirstClick = () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        // If it hasn't started yet, play it
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("First click play failed:", e));
      }
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [isPlaying]);

  // Playback control logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.log("Play failed:", e));

      // Fade In Effect (only if volume is low/zero)
      if (audio.volume < 0.1) {
        audio.volume = 0;
        let currentVol = 0;
        const targetVol = volume;
        const duration = 2000;
        const steps = 20;
        const increment = targetVol / steps;
        const intervalTime = duration / steps;

        const fadeInterval = setInterval(() => {
          currentVol += increment;
          if (currentVol >= targetVol) {
            audio.volume = targetVol;
            clearInterval(fadeInterval);
          } else {
            audio.volume = currentVol;
          }
        }, intervalTime);

        return () => clearInterval(fadeInterval);
      } else {
        audio.volume = volume;
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]); // Volume removed from dependency to prevent re-triggering fade on slider move

  // Volume sync logic
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = volume;
    }
  }, [volume, isPlaying]);

  const toggleMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsExpanded(true);
    } else {
      setIsExpanded(prev => !prev);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
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
          className="object-cover brightness-90"
        />
      </div>

      {/* Hidden Audio */}
      {musicData && (
        <audio
          ref={audioRef}
          src={musicData.src}
          loop
          preload="auto"
        />
      )}

      {/* Floating Music Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Now Playing Info & Slider Container */}
        <div className={`flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-zinc-800/50 shadow-2xl transition-all duration-500 origin-right ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
          
          <div className="flex items-end gap-[2px] h-3 w-4">
            <div className={`w-1 bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.6s_ease-in-out_infinite]' : 'h-1'}`} style={{ animationDelay: '0s' }} />
            <div className={`w-1 bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.8s_ease-in-out_infinite]' : 'h-2'}`} style={{ animationDelay: '0.2s' }} />
            <div className={`w-1 bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.7s_ease-in-out_infinite]' : 'h-1.5'}`} style={{ animationDelay: '0.4s' }} />
          </div>

          <div className="flex flex-col min-w-[120px]">
            <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[150px]">
              {musicData?.title || "Loading..."}
            </span>
            <span className="text-[9px] font-medium text-zinc-400 leading-tight">
              {musicData?.artist || ""}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-zinc-800 mx-1" />

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-300 transition-all"
            />
            <span className="text-[10px] font-bold text-zinc-400 w-7 text-right tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleMusic}
          className={`p-4 rounded-2xl transition-all duration-300 border shadow-2xl active:scale-95 ${isPlaying ? 'bg-white text-black border-white' : 'bg-zinc-900/90 text-zinc-300 border-zinc-800/50 hover:bg-zinc-800/90 hover:text-white'}`}
          aria-label="Toggle background music"
        >
          {isPlaying ? <Music size={20} className="animate-pulse" /> : getVolumeIcon()}
        </button>
      </div>

      <style jsx global>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </>
  );
}
