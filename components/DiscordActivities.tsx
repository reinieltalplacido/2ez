"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  timestamps?: {
    start: number;
    end?: number;
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

const getActivityImage = (activity: Activity) => {
  if (activity.assets?.large_image) {
    if (activity.assets.large_image.startsWith("mp:external/")) {
      return `https://media.discordapp.net/external/${activity.assets.large_image.replace(
        "mp:external/",
        ""
      )}`;
    }
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  }

  // Fallback for games like Valorant that use application icons instead of rich presence assets
  if (activity.application_id) {
    return `https://dcdn.dstn.to/app-icons/${activity.application_id}`;
  }

  return null;
};

const getActivitySmallImage = (activity: Activity) => {
  if (activity.assets?.small_image) {
    if (activity.assets.small_image.startsWith("mp:external/")) {
      return `https://media.discordapp.net/external/${activity.assets.small_image.replace(
        "mp:external/",
        ""
      )}`;
    }
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
  }
  return null;
};

const TimeElapsed = ({ start }: { start: number }) => {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = now - start;
      const seconds = Math.floor(diff / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const hours = Math.floor(mins / 60);

      const timeStr =
        hours > 0
          ? `${hours}:${(mins % 60).toString().padStart(2, "0")}:${secs
              .toString()
              .padStart(2, "0")}`
          : `${mins}:${secs.toString().padStart(2, "0")}`;

      setElapsed(timeStr);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return <span>{elapsed} elapsed</span>;
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
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, []);

  if (activities.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Playing</h2>
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800"
        >
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700/50 shadow-md">
              {getActivityImage(activity) ? (
                <Image
                  src={getActivityImage(activity)!}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-zinc-400 text-3xl">🎮</span>
              )}
            </div>
            {getActivitySmallImage(activity) && (
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#111113] p-[3px]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-800">
                  <Image
                    src={getActivitySmallImage(activity)!}
                    alt="Small asset"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}
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
            {activity.timestamps?.start && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-zinc-500">
                  <TimeElapsed start={activity.timestamps.start} />
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
