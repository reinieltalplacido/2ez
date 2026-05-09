import {
  Radio,
  Music,
  Video,
  MessageCircle,
  Code,
  Briefcase,
  LucideIcon
} from "lucide-react";

export type Status = "online" | "idle" | "dnd" | "offline";

export interface LinkConfig {
  title: string;
  subtitle: string;
  url: string;
  iconName: string;
}

export const config = {
  // Required Information (Please provide these)
  discordId: "862235535749808138", // Find this by enabling Developer Mode in Discord and right-clicking your profile
  name: "2ez",
  avatar: "/steam.jpg", // Place your avatar in the /public folder
  status: "dnd" as Status, 
  
  // Media Configuration
  background: {
    video: "/bg.mp4",         // Place your video in /public/bg.mp4
    fallbackImage: "/bg.jpg", // Fallback if video fails
  },
  music: {
    src: "/music.mp3",        // Place your music in /public/music.mp3
    volume: 0.3,              // 0.0 to 1.0
    autoplay: true,
  },
  
  // Social Links
  links: [
    { title: "Kick", subtitle: "Streaming Channel", url: "https://kick.com/", iconName: "Radio" },
    { title: "TikTok", subtitle: "TikTok Channel", url: "https://tiktok.com/", iconName: "Music" },
    { title: "YouTube", subtitle: "YouTube Channel", url: "https://youtube.com/", iconName: "Video" },
    { title: "Facebook", subtitle: "Facebook Page", url: "https://facebook.com/", iconName: "MessageCircle" },
    { title: "GitHub", subtitle: "My Code", url: "https://github.com/", iconName: "Code" },
    { title: "Portfolio", subtitle: "My Work", url: "#", iconName: "Briefcase" },
  ] as LinkConfig[]
};

// Helper map to convert string icon names to actual Lucide components
export const IconMap: Record<string, LucideIcon> = {
  Radio,
  Music,
  Video,
  MessageCircle,
  Code,
  Briefcase
};
