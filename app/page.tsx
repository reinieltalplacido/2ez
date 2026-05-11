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
        
        {/* Banner */}
        <div className="h-32 w-full bg-transparent relative">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>

        {/* Profile Content */}
        <div className="px-6 pt-16 pb-6 relative">
          
          {/* Avatar & Status */}
          <div className="absolute -top-14 left-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-[6px] border-[#0F0F10] overflow-hidden bg-zinc-800">
                <Image
                  src={config.avatar}
                  alt={config.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Status Badge */}
              <DiscordStatus />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-xl font-bold text-white">{config.name}</h1>
            
            {/* Discord Activities */}
            <div className="mt-2">
              <DiscordActivities />
            </div>

            {/* Spotify Widget */}
            <div className="mt-2">
              <SpotifyWidget />
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-6">
             <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">Links</h2>
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
