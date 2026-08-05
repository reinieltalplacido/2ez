"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { config, IconMap } from "@/config";
import { BackgroundMedia } from "@/components/BackgroundMedia";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { ViewCounter } from "@/components/ViewCounter";
import { DiscordStatus } from "@/components/DiscordStatus";
import { DiscordActivities } from "@/components/DiscordActivities";
import { ProfileEffect } from "@/components/ProfileEffect";
import { useDiscordUser, getAvatarUrl, getAvatarDecorationUrl } from "@/components/useDiscordUser";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const discordUser = useDiscordUser();

  const name = discordUser?.display_name || discordUser?.global_name || config.name;
  const discordName = discordUser?.username || config.discordName;
  const avatar = discordUser ? getAvatarUrl(discordUser) : config.avatar;
  const avatarDecoration = discordUser ? getAvatarDecorationUrl(discordUser) : null;

  useEffect(() => {
    // Disable Right Click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Disable Keyboard Shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === "i" || e.key.toLowerCase() === "c" || e.key.toLowerCase() === "j")) e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 font-sans text-zinc-100 overflow-x-hidden">
      <BackgroundMedia />

      {/* Entry Overlay */}
      {!entered && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md cursor-pointer transition-opacity duration-700"
          onClick={() => setEntered(true)}
        >
          <div className="animate-pulse text-zinc-300 font-bold tracking-[0.3em] text-sm uppercase">
            [ Click anywhere to enter ]
          </div>
        </div>
      )}

      {/* Main Profile Card */}
      <div className={`w-full max-w-[440px] bg-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 shadow-2xl transition-all duration-1000 delay-100 ${entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90 pointer-events-none'}`}>
        
        {/* Profile Header (Avatar + Info) */}
        <div className="px-6 pt-8 pb-6 relative">
          
          <div className="flex items-center gap-5 mb-6">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <ProfileEffect />
              {avatarDecoration && (
                <div className="absolute -inset-3 flex items-center justify-center pointer-events-none">
                  <Image
                    src={avatarDecoration}
                    alt="Avatar decoration"
                    width={104}
                    height={104}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
              )}
              <div className="w-20 h-20 rounded-full border-[4px] border-[#0F0F10] overflow-hidden bg-zinc-800 shadow-xl">
                <Image
                  src={avatar}
                  alt={name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Status Badge */}
              <DiscordStatus />
            </div>

            {/* User Info Section */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">{name}</h1>
              {discordName && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[15px] font-medium text-zinc-300">{discordName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Spotify Widget & Other Content */}
          <div className="space-y-4">
            <DiscordActivities />
            <SpotifyWidget />
          </div>

          {/* Links Section */}
          <div className="mt-8">
             <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 px-1">Links</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.links.map((link, index) => {
                  const Icon = IconMap[link.iconName];
                  
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 ${
                        config.links.length % 2 !== 0 && index === config.links.length - 1
                          ? "sm:col-span-2 sm:w-[calc(50%-0.375rem)] sm:justify-self-center w-full"
                          : ""
                      }`}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border"
                        style={{
                          backgroundColor: `${link.color}15`,
                          borderColor: `${link.color}30`,
                        }}
                      >
                        {Icon && (
                          <Icon 
                            className="w-5 h-5 transition-all duration-300 group-hover:scale-110" 
                            style={{ 
                              color: link.color,
                              filter: `drop-shadow(0 0 5px ${link.color}60)`
                            }} 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-200 group-hover:text-white truncate">
                          {link.title}
                        </p>
                        <p className="text-xs text-zinc-500 group-hover:text-zinc-400 truncate">
                          {link.subtitle}
                        </p>
                      </div>
                    </a>
                  );
                })}
             </div>
          </div>

          <ViewCounter />

        </div>
      </div>
    </main>
  );
}
