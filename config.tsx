import type { ComponentType, SVGProps } from "react";

// Custom SVG components for brand icons missing in Lucide
const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Tiktok = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    {/* Red/Magenta Layer */}
    <path
      d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
      stroke="#FE2C55"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(0.8, 0.8)"
    />
    {/* Cyan Layer */}
    <path
      d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
      stroke="#25F4EE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(-0.8, -0.8)"
    />
    {/* White/Main Layer */}
    <path
      d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Kick = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 2v20h5.33v-5.33h2.67v5.33H20v-6.67h-2.67v-2.66h2.67V2h-8v5.33H9.33V2H4z" />
  </svg>
);

export type Status = "online" | "idle" | "dnd" | "offline";

export interface LinkConfig {
  title: string;
  subtitle: string;
  url: string;
  iconName: string;
  color: string;
}

export const config = {
  
  discordId: "862235535749808138", 
  discordName: "2ezoreo",
  name: "2ez",
  avatar: "/steam.jpg", 
  status: "dnd" as Status, 
  
 
  background: {
    image: "/image.png",
  },
  
 
  links: [
    { title: "TikTok", subtitle: "TikTok Channel", url: "https://www.tiktok.com/@2ezdota", iconName: "Tiktok", color: "#FE2C55" },
    { title: "YouTube", subtitle: "YouTube Channel", url: "https://www.youtube.com/@OreoEvile", iconName: "Youtube", color: "#FF0000" },
    { title: "Facebook", subtitle: "Facebook Page", url: "https://www.facebook.com/profile.php?id=61563096756693", iconName: "Facebook", color: "#1877F2" },
    { title: "Kick", subtitle: "Kick Channel", url: "https://kick.com/oreoyoo", iconName: "Kick", color: "#53FC18" },
  ] as LinkConfig[]
};


export const IconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Tiktok,
  Youtube,
  Facebook,
  Kick
};
