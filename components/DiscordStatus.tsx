"use client";

import { useEffect, useState } from "react";
import { config, Status } from "@/config";

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
}

interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

export function DiscordStatus() {
  const [status, setStatus] = useState<Status>(config.status);

  useEffect(() => {
    if (!config.discordId || config.discordId === "YOUR_DISCORD_ID") return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${config.discordId}`);
        const json: LanyardResponse = await res.json();
        if (json.success && json.data.discord_status) {
          setStatus(json.data.discord_status);
        }
      } catch (error) {
        console.error("Error fetching Discord status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStatusIcon = () => {
    switch (status) {
      case "online":
        return (
          <div className="w-full h-full bg-[#23a55a] rounded-full" />
        );
      case "idle":
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-[#f0b232] rounded-full" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F0F10] rounded-full" />
          </div>
        );
      case "dnd":
        return (
          <div className="w-full h-full bg-[#f23f43] rounded-full flex items-center justify-center">
            <div className="w-3 h-1 bg-[#0F0F10] rounded-full" />
          </div>
        );
      case "offline":
        return (
          <div className="w-full h-full rounded-full border-[5px] border-[#80848e] bg-transparent" />
        );
      default:
        return <div className="w-full h-full bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full border-[4px] border-[#0F0F10] bg-[#0F0F10] overflow-hidden">
      {renderStatusIcon()}
    </div>
  );
}
