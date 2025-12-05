import { useEffect, useState } from "react";

const CHANNEL_NAME = "tue_ofuro";

export const TwitchLivePlayer = () => {
  const [isLive, setIsLive] = useState(false);
  const [parent, setParent] = useState("");

  useEffect(() => {
    // Set parent domain for Twitch Embed embedding
    // In dev, it might be localhost, in prod it's the domain name
    if (typeof window !== "undefined") {
      setParent(window.location.hostname);
    }

    const checkLiveStatus = async () => {
      try {
        const res = await fetch("/api/twitch_status");
        if (res.ok) {
          const data = await res.json();
          setIsLive(data.isLive);
        }
      } catch (e) {
        console.error("Failed to check twitch status", e);
      }
    };

    checkLiveStatus();
  }, []);

  if (!isLive || !parent) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="font-bold text-red-500 tracking-wider">
          NOW ON AIR
        </span>
      </div>
      <div className="w-full aspect-w-16 aspect-h-9 shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <iframe
          src={`https://player.twitch.tv/?channel=${CHANNEL_NAME}&parent=${parent}&muted=false`}
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};
