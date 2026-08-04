"use client";

import { useEffect, useState } from "react";
import { config } from "@/config";

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string;
  display_name?: string;
  avatar?: string;
  discriminator?: string;
}

export function getAvatarUrl(user: DiscordUser, size = 256) {
  if (!user.avatar) {
    const index = Number(user.discriminator || "0") % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png?size=${size}`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
}

interface LanyardData {
  discord_user?: DiscordUser;
  heartbeat_interval?: number;
}

interface LanyardMessage {
  op: number;
  t?: string;
  d?: LanyardData;
}

export function useDiscordUser() {
  const [user, setUser] = useState<DiscordUser | null>(null);

  useEffect(() => {
    if (!config.discordId || config.discordId === "YOUR_DISCORD_ID") return;

    let socket: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        socket?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: config.discordId },
          })
        );
      };

      socket.onmessage = (event) => {
        let message: LanyardMessage;
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }

        if (message.op === 1) {
          const interval = message.d?.heartbeat_interval;
          if (interval) {
            if (heartbeat) clearInterval(heartbeat);
            heartbeat = setInterval(() => {
              socket?.send(JSON.stringify({ op: 3 }));
            }, interval);
          }
        } else if (message.op === 0) {
          const data = message.d;
          if (data?.discord_user) {
            setUser(data.discord_user);
          }
        }
      };

      socket.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!closed) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    connect();

    return () => {
      closed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (heartbeat) clearInterval(heartbeat);
      socket?.close();
    };
  }, []);

  return user;
}
