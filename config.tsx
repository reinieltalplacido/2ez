import {
  Radio,
  Music,
  Code,
  Briefcase,
  LucideIcon
} from "lucide-react";
import React from "react";

// Custom SVG components for brand icons missing in Lucide
const Facebook = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Github = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Youtube = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Tiktok = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export type Status = "online" | "idle" | "dnd" | "offline";

export interface LinkConfig {
  title: string;
  subtitle: string;
  url: string;
  iconName: string;
}

export const config = {
  
  discordId: "862235535749808138", 
  name: "2ez",
  avatar: "/steam.jpg", 
  status: "dnd" as Status, 
  
 
  background: {
    image: "/acess.png",
  },
  music: {
    src: "/music.mp3",        
    volume: 0.3,              
    autoplay: true,
  },
  
 
  links: [
    { title: "TikTok", subtitle: "TikTok Channel", url: "https://www.tiktok.com/@2ezdota", iconName: "Tiktok" },
    { title: "YouTube", subtitle: "YouTube Channel", url: "https://www.youtube.com/@Oreoo-f5g", iconName: "Youtube" },
    { title: "Facebook", subtitle: "Facebook Page", url: "https://www.facebook.com/profile.php?id=61563096756693", iconName: "Facebook" },
    { title: "GitHub", subtitle: "My Code", url: "https://github.com/reinieltalplacido", iconName: "Github" },
    { title: "Portfolio", subtitle: "My Work", url: "https://reiniel.vercel.app", iconName: "Briefcase" },
  ] as LinkConfig[]
};

// Helper map to convert string icon names to actual Lucide components
export const IconMap: Record<string, any> = {
  Radio,
  Music,
  Tiktok,
  Youtube,
  Facebook,
  Github,
  Code,
  Briefcase
};
