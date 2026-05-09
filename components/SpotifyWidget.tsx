"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { config } from "@/config";

// Lanyard API Types
interface LanyardData {
  spotify: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  listening_to_spotify: boolean;
}

interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

export function SpotifyWidget() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!config.discordId || config.discordId === "YOUR_DISCORD_ID") return;

    // We'll use polling for simplicity and robust fallback, though WebSocket is possible
    const fetchSpotifyData = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${config.discordId}`);
        const json: LanyardResponse = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Error fetching Lanyard data:", error);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 5000); // Poll every 5s
    
    return () => clearInterval(interval);
  }, []);

  // Handle progress bar animation
  useEffect(() => {
    if (!data?.spotify) return;

    const updateProgress = () => {
      const { start, end } = data.spotify!.timestamps;
      const now = Date.now();
      const total = end - start;
      const current = now - start;
      const percentage = Math.min(Math.max((current / total) * 100, 0), 100);
      setProgress(percentage);
    };

    updateProgress();
    const animationFrame = setInterval(updateProgress, 1000);

    return () => clearInterval(animationFrame);
  }, [data]);

  if (!data?.listening_to_spotify || !data.spotify) {
    return (
      <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-800 rounded-md flex items-center justify-center">
            <svg className="w-6 h-6 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.87 7.076-.496 9.712 1.115.293.18.386.563.206.856zm1.263-2.825c-.226.367-.7.487-1.066.26-2.69-1.65-6.8-2.146-9.965-1.175-.406.125-.84-.105-.965-.51-.125-.406.105-.84.51-.965 3.614-1.11 8.176-.554 11.225 1.32.368.226.488.7.26 1.07zm.106-2.954C14.776 8.74 8.56 8.52 4.996 9.605c-.488.148-1.008-.127-1.156-.615-.148-.488.127-1.008.615-1.156 4.108-1.246 10.976-.99 14.654 1.196.438.26.58.835.32 1.272-.26.438-.835.58-1.272.32z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">Not playing</p>
            <p className="text-xs text-zinc-500">Spotify</p>
          </div>
        </div>
      </div>
    );
  }

  const { song, artist, album_art_url, timestamps } = data.spotify;

  // Format milliseconds to MM:SS
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = Date.now() - timestamps.start;
  const totalDuration = timestamps.end - timestamps.start;

  return (
    <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 shadow-sm transition-all hover:bg-zinc-900/90">
      <div className="flex items-center gap-4">
        {album_art_url && (
          <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden">
            <Image
              src={album_art_url}
              alt={song}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-zinc-100 truncate">{song}</p>
          <p className="text-xs text-zinc-400 truncate">{artist}</p>
          
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-zinc-500 w-8">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-zinc-500 w-8">{formatTime(totalDuration)}</span>
          </div>
        </div>
        <div className="shrink-0 text-green-500 flex justify-center items-center">
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.87 7.076-.496 9.712 1.115.293.18.386.563.206.856zm1.263-2.825c-.226.367-.7.487-1.066.26-2.69-1.65-6.8-2.146-9.965-1.175-.406.125-.84-.105-.965-.51-.125-.406.105-.84.51-.965 3.614-1.11 8.176-.554 11.225 1.32.368.226.488.7.26 1.07zm.106-2.954C14.776 8.74 8.56 8.52 4.996 9.605c-.488.148-1.008-.127-1.156-.615-.148-.488.127-1.008.615-1.156 4.108-1.246 10.976-.99 14.654 1.196.438.26.58.835.32 1.272-.26.438-.835.58-1.272.32z" />
            </svg>
        </div>
      </div>
    </div>
  );
}
