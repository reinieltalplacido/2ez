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

const statusColors = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

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
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = statusColors[status] || statusColors.offline;

  return (
    <div
      className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-[#0F0F10] ${statusColor}`}
    />
  );
}
