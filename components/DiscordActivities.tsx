"use client";

import { useEffect, useState } from "react";
import { config } from "@/config";

interface Activity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
    small_image?: string;
  };
}

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
}

interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

const activityTypes: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  4: "Custom",
  5: "Competing",
};

export function DiscordActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!config.discordId || config.discordId === "YOUR_DISCORD_ID") return;

    const fetchActivities = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${config.discordId}`);
        const json: LanyardResponse = await res.json();
        if (json.success && json.data.activities) {
          // Filter out Spotify (handled separately) and custom statuses
          const filtered = json.data.activities.filter(
            (act) => act.type !== 2 && act.type !== 4
          );
          setActivities(filtered);
        }
      } catch (error) {
        console.error("Error fetching Discord activities:", error);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 10000);
    return () => clearInterval(interval);
  }, []);

  if (activities.length === 0) return null;

  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800"
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 text-lg">🎮</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-zinc-400 uppercase">
              {activityTypes[activity.type] || "Activity"}
            </p>
            <p className="text-sm font-semibold text-zinc-200 truncate">
              {activity.name}
            </p>
            {activity.details && (
              <p className="text-xs text-zinc-500 truncate">{activity.details}</p>
            )}
            {activity.state && (
              <p className="text-xs text-zinc-500 truncate">{activity.state}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
