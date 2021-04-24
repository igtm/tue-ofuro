import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from "react";
import { useFloatingPlayAreaContext } from "../../context/FloatingPlayAreaContext";
import { fmtPrettyJPTime } from "../../utilities/fmtPrettyJPTime";
import { SvgPause } from "../atoms/SvgPause";
import { SvgPlayArrow } from "../atoms/SvgPlayArrow";
import Marquee from "react-fast-marquee";

export const FloatingPlayArea: VFC = () => {
  const floatingPlayAreaState = useFloatingPlayAreaContext();

  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * 再生中かどうか
   */
  const [playing, setPlaying] = useState(false);

  /**
   * 音声メディアの長さ
   */
  const [duration, setDuration] = useState<number | undefined>();

  /**
   * 音声メディアの現在の再生位置
   */
  const [currentTime, setCurrentTime] = useState<number | undefined>();

  const durationString = useMemo(() => {
    if (duration == null) {
      return "--:--:--";
    }

    return fmtPrettyJPTime(duration);
  }, [duration]);

  const currentTimeString = useMemo(() => {
    if (currentTime == null) {
      return "--:--:--";
    }

    return fmtPrettyJPTime(currentTime);
  }, [currentTime]);

  const progress = useMemo(() => {
    if (duration == null || currentTime == null) {
      return 0;
    }

    return Math.round((currentTime / duration) * 1000) / 10;
  }, [currentTime, duration]);

  const playAudio = useCallback(() => {
    audioRef.current?.play();
    setPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const handleClickSeekBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const audioElement = audioRef.current;

    if (audioElement === null || duration == null) {
      return;
    }

    const mouse = e.clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    const position = rect.left + window.pageXOffset;
    const offset = mouse - position;
    const width = rect.right - rect.left;

    const clickTime = Math.floor(duration * (offset / width));

    audioElement.currentTime = clickTime;
    setCurrentTime(clickTime);
  };

  // audio 要素の loadedmetadata イベントハンドラを設定する
  useEffect(() => {
    // メディアの読み込みに完了したときに発火する処理
    const onLoadMetaData = (e: Event) => {
      const target = e.target;

      if (target == null || !(target instanceof HTMLAudioElement)) {
        return;
      }

      // duration を設定する
      // duration は NaN, Infinity になることがあるので、それ以外のみ処理する
      if (isFinite(target.duration)) {
        const duration = Math.floor(target.duration);
        setDuration(duration);
      }

      // currentTime を更新する処理を設定する
      requestAnimationFrame(function me() {
        if (target != null) {
          const audioElementCurrentTime = Math.floor(target.currentTime);
          if (currentTime !== audioElementCurrentTime) {
            setCurrentTime(audioElementCurrentTime);
          }
        }
        requestAnimationFrame(me);
      });

      // 再生する
      target.play();
      setPlaying(true);
    };

    // メディアの再生が終了したときに発火する処理
    const onEnded = () => {
      setPlaying(false);
    };

    // useEffect のクリーンアップ関数でも利用するため current を変数に退避しておく
    const audioElement = audioRef.current;

    audioElement?.addEventListener("loadedmetadata", onLoadMetaData);
    audioElement?.addEventListener("ended", onEnded);

    return () => {
      audioElement?.removeEventListener("loadedmetadata", onLoadMetaData);
      audioElement?.removeEventListener("ended", onEnded);
    };
  });

  if (floatingPlayAreaState.podcastEpisode == null) {
    return <></>;
  }

  return (
    <section
      style={{
        boxShadow:
          "0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 3px 5px -1px rgb(0 0 0 / 20%)",
      }}
      className="fixed bottom-0 left-0 w-full bg-white"
    >
      <div
        className="relative w-full h-2 bg-gray-300 cursor-pointer"
        onClick={handleClickSeekBar}
        aria-hidden="true"
      >
        <div
          style={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-yellow-500"
        ></div>
      </div>

      <div
        className="w-full gap-4 p-4 pb-6"
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns:
            "64px calc(100% - 64px - 48px - (50% - 24px - 16px) - 48px) 48px 1fr",
        }}
      >
        <div className="">
          <div className="w-16 h-16 overflow-hidden rounded">
            <img src="/saru.jpg" width={128} height={128} alt="" />
          </div>
        </div>

        <div className="">
          <Marquee speed={50} gradientWidth={50}>
            <h1 className="w-full text-sm text-gray-900 whitespace-nowrap">
              {floatingPlayAreaState.podcastEpisode.title}
              {"     "}
            </h1>
          </Marquee>
        </div>

        <div className="">
          {playing ? (
            <button
              className="grid w-12 h-12 border border-gray-900 rounded-full place-items-center focus:outline-none"
              onClick={pauseAudio}
            >
              <SvgPause className="w-10 h-10 text-gray-900 fill-current" />
              <span className="sr-only">停止</span>
            </button>
          ) : (
            <button
              className="grid w-12 h-12 border border-gray-900 rounded-full place-items-center focus:outline-none"
              onClick={playAudio}
            >
              <SvgPlayArrow className="w-10 h-10 text-gray-900 fill-current" />
              <span className="sr-only">再生</span>
            </button>
          )}
        </div>

        <div className="hidden fle md:block" style={{ justifySelf: "end" }}>
          <div className="font-mono text-sm text-gray-900">
            {currentTimeString} / {durationString}
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- 代替コンテンツを用意できていない*/}
        <audio
          ref={audioRef}
          src={floatingPlayAreaState.podcastEpisode?.enclosure.url}
        />
      </div>
    </section>
  );
};
