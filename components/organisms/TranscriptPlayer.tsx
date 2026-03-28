import { useEffect, useMemo, useRef, useState, VFC } from "react";

type PlayerState = {
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
  destroy(): void;
};

type PlayerConstructor = new (
  elementId: string,
  options: {
    videoId: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: () => void;
    };
  }
) => PlayerState;

declare global {
  interface Window {
    YT?: {
      Player: PlayerConstructor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = {
  title: string;
  videoId: string;
  initialStartSec?: number;
  seekToSec?: number | null;
  onCurrentTimeChange?: (currentTime: number) => void;
};

let youtubePlayerApiPromise: Promise<void> | null = null;

function loadYouTubePlayerApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubePlayerApiPromise) {
    return youtubePlayerApiPromise;
  }

  youtubePlayerApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    const handleReady = () => {
      resolve();
    };

    window.onYouTubeIframeAPIReady = handleReady;

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  });

  return youtubePlayerApiPromise;
}

export const TranscriptPlayer: VFC<Props> = ({
  title,
  videoId,
  initialStartSec = 0,
  seekToSec,
  onCurrentTimeChange,
}) => {
  const playerContainerId = useMemo(
    () => `transcript-player-${videoId}`,
    [videoId]
  );
  const playerRef = useRef<PlayerState | null>(null);
  const initialStartSecRef = useRef(initialStartSec);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initialStartSecRef.current = initialStartSec;
  }, [initialStartSec]);

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = async () => {
      await loadYouTubePlayerApi();
      if (!isMounted || !window.YT?.Player) {
        return;
      }

      playerRef.current?.destroy();
        playerRef.current = new window.YT.Player(playerContainerId, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
            start: Math.max(0, Math.floor(initialStartSecRef.current)),
          },
          events: {
            onReady: () => {
              if (!isMounted) {
                return;
              }
              setIsReady(true);
              if (initialStartSecRef.current > 0) {
                playerRef.current?.seekTo(initialStartSecRef.current, true);
              }
            },
          },
        });
    };

    setupPlayer();

    return () => {
      isMounted = false;
      setIsReady(false);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [playerContainerId, videoId]);

  useEffect(() => {
    if (!isReady || seekToSec == null) {
      return;
    }

    playerRef.current?.seekTo(seekToSec, true);
  }, [isReady, seekToSec]);

  useEffect(() => {
    if (!isReady || !onCurrentTimeChange) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime();
      if (typeof currentTime === "number" && !Number.isNaN(currentTime)) {
        onCurrentTimeChange(currentTime);
      }
    }, 300);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isReady, onCurrentTimeChange]);

  return (
    <div className="rounded-2xl overflow-hidden border border-base-300 bg-neutral shadow-xl h-full">
      <div className="relative w-full h-full" style={{ paddingTop: "56.25%" }}>
        <div
          id={playerContainerId}
          className="absolute inset-0 w-full h-full"
          aria-label={title}
        />
      </div>
    </div>
  );
};
