import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  useFloatingPlayAreaContext,
  useFloatingPlayDispatchContext,
} from "../../context/FloatingPlayAreaContext";

export const FloatingPlayArea = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef<HTMLSpanElement>(null);
  const floatingPlayAreaState = useFloatingPlayAreaContext();
  const floatingPlayAreaDispatchState = useFloatingPlayDispatchContext();

  useEffect(() => {
    audioRef.current?.addEventListener("loadedmetadata", function (e) {
      let time = audioRef.current?.currentTime;
      requestAnimationFrame(function me() {
        if (time !== audioRef.current?.currentTime) {
          time = audioRef.current?.currentTime;
          audioRef.current?.dispatchEvent(new CustomEvent("timeupdate"));
        }
        requestAnimationFrame(me);
      });
    });
    audioRef.current?.addEventListener("timeupdate", (e) => {
      const audio = audioRef.current;
      const seekBar = seekBarRef.current;
      const currentTimeSpan = currentTimeRef.current;
      const durationSpan = durationRef.current;
      if (audio === null || seekBar === null) {
        return;
      }
      const duration = Math.round(audio.duration);
      if (isNaN(duration)) {
        return;
      }
      if (currentTimeSpan !== null && durationSpan !== null) {
        currentTimeSpan.innerHTML = playTime(Math.floor(audio.currentTime));
        durationSpan.innerHTML = playTime(duration);
      }
      const percent =
        Math.round((audio.currentTime / audio.duration) * 1000) / 10;
      seekBar.style.backgroundSize = percent + "%";
    });
  }, []);

  const seekBarStyle = {
    height: "10px",
    borderRadius: "5px",
    background: "linear-gradient(#ccc, #ccc) no-repeat #eee",
  };

  const handleClickSeekBar = (e: MouseEvent) => {
    const audio = audioRef.current;
    if (audio === null) {
      return;
    }
    const duration = Math.round(audio.duration);
    if (!isNaN(duration)) {
      const mouse = e.clientX;
      const rect = e.currentTarget.getBoundingClientRect();
      const position = rect.left + window.pageXOffset;
      const offset = mouse - position;
      const width = rect.right - rect.left;
      audio.currentTime = Math.round(duration * (offset / width));
    }
  };

  if (floatingPlayAreaState.podcastEpisode == null) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#ffffff",
        width: "100%",
        textAlign: "center",
        borderTop: "orange 1px solid",
        boxShadow:
          "0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)",
      }}
      className="flex p-4"
    >
      <div className="flex-grow">
        <div className="flex flex-between gap-2">
          <div>
            <Image
              className="rounded-sm"
              src="/saru.jpg"
              width={24}
              height={24}
            />
          </div>
          <div className="text-xs">
            {floatingPlayAreaState.podcastEpisode?.title ?? ""}
          </div>
        </div>
      </div>
      <div className="w-80 m-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <span ref={currentTimeRef}>00:00</span>
          <span ref={durationRef}>00:00</span>
        </div>
        <div
          ref={seekBarRef}
          style={seekBarStyle}
          onClick={(e) => handleClickSeekBar(e)}
        ></div>
      </div>
      <audio
        ref={audioRef}
        src={floatingPlayAreaState.podcastEpisode?.enclosure.url}
      ></audio>
      <div className="flex-grow">
        <PlayLogo
          onClick={() => {
            audioRef.current?.play();
          }}
        />
        <PauseLogo
          onClick={() => {
            audioRef.current?.play();
          }}
        />
      </div>
      <div className="flex-grow flex">
        <VolumeLogo />
        <div className="text-gray-500">---</div>
      </div>
    </div>
  );
};

const PlayLogo = ({ onClick }: { onClick: () => void }) => {
  return (
    <a onClick={onClick} className="block py-4 px-4 md:px-6 w-48 md:w-60">
      <img src="/play_arrow_black_24dp.svg" alt="再生" />
    </a>
  );
};

const PauseLogo = ({ onClick }: { onClick: () => void }) => {
  return (
    <a onClick={onClick} className="block py-4 px-4 md:px-6 w-48 md:w-60">
      <img src="/pause_black_24dp.svg" alt="停止" />
    </a>
  );
};

const VolumeLogo = () => {
  return (
    <a className="block py-4 px-4 md:px-6 w-48 md:w-60">
      <img src="/volume_up_black_24dp.svg" alt="mute" />
    </a>
  );
};

const MuteLogo = () => {
  return (
    <a className="block py-4 px-4 md:px-6 w-48 md:w-60">
      <img src="/volume_up_black_24dp.svg" alt="unmute" />
    </a>
  );
};

function playTime(t: number) {
  let hms = "";
  const h = (t / 3600) | 0;
  const m = ((t % 3600) / 60) | 0;
  const s = t % 60;
  const z2 = (v: number) => {
    const s = "00" + v;
    return s.substr(s.length - 2, 2);
  };
  if (h != 0) {
    hms = h + ":" + z2(m) + ":" + z2(s);
  } else if (m != 0) {
    hms = z2(m) + ":" + z2(s);
  } else {
    hms = "00:" + z2(s);
  }
  return hms;
}
