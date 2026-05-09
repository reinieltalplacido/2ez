"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchAndIncrement = async () => {
      try {
        // Check if already counted this session
        const hasViewed = sessionStorage.getItem("viewed");
        
        // First get current count
        const res = await fetch("/api/views");
        const data = await res.json();
        
        if (!hasViewed) {
          // Increment if new session
          const incrementRes = await fetch("/api/views", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ increment: true }),
          });
          const incrementData = await incrementRes.json();
          setCount(incrementData.count);
          sessionStorage.setItem("viewed", "true");
        } else {
          // Just show current count
          setCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchAndIncrement();
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 text-zinc-500 text-xs">
      <Eye size={14} />
      <span>Profile Views:</span>
      <span className="font-mono text-zinc-400">{count.toLocaleString()}</span>
    </div>
  );
}
