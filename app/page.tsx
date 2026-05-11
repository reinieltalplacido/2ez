"use client";

import Image from "next/image";
import { config, IconMap } from "@/config";
import { BackgroundMedia } from "@/components/BackgroundMedia";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { ViewCounter } from "@/components/ViewCounter";
import { DiscordStatus } from "@/components/DiscordStatus";
import { DiscordActivities } from "@/components/DiscordActivities";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 font-sans text-zinc-100 overflow-x-hidden">
      <BackgroundMedia />

      {/* Main Profile Card */}
      <div className="w-full max-w-[440px] bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-zinc-800/50 shadow-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Profile Header (Avatar + Info) */}
        <div className="px-6 pt-8 pb-6 relative">
          
          <div className="flex items-center gap-5 mb-6">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-[4px] border-[#0F0F10] overflow-hidden bg-zinc-800 shadow-xl">
                <Image
                  src={config.avatar}
                  alt={config.name}
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
              <h1 className="text-2xl font-bold text-white tracking-tight">{config.name}</h1>
              {/* Status/Activity can go here if needed, or keep them below */}
              <div className="mt-1 flex items-center gap-2">
                <DiscordActivities />
              </div>
            </div>
          </div>

          {/* Spotify Widget & Other Content */}
          <div className="space-y-4">
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
                      className="group flex items-center gap-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors">
                        {Icon && <Icon className="w-5 h-5 text-zinc-300 group-hover:text-white" />}
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
