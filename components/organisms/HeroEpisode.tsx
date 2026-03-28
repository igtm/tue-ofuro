import Link from "next/link";
import { CSSProperties, useEffect, useState, VFC } from "react";
import { useFloatingPlayDispatchContext } from "../../context/FloatingPlayAreaContext";
import { formatAsJSTDateTime, parseDate } from "../../lib/date";
import {
  isPodcastEpisode,
  PodcastEpisode,
  YouTubeEpisode,
} from "../../types";
import { SvgPlayArrow } from "../atoms/SvgPlayArrow";
import { TransitionLink } from "../atoms/TransitionLink";

type Props = {
  episode: PodcastEpisode | YouTubeEpisode;
  transcriptHref?: string;
};

export const HeroEpisode: VFC<Props> = ({ episode, transcriptHref }) => {
  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();
  const [isLive, setIsLive] = useState(false);
  const [parent, setParent] = useState("");
  const CHANNEL_NAME = "tue_ofuro";

  useEffect(() => {
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

    void checkLiveStatus();
  }, []);

  const isPodcast = isPodcastEpisode(episode);
  const date = formatAsJSTDateTime(parseDate(episode.pubDate));

  let thumbnail = "/saru.jpg";
  if (!isPodcast) {
    thumbnail = episode.thumbnailUrl;
  }

  const handlePodcastPlay = () => {
    if (isPodcast) {
      updateFloatingPlayAreaState(episode);
    }
  };

  return (
    <div className="w-full bg-[#1e293b] py-12 shadow-sm">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:gap-8">
        <figure className="relative w-full min-h-[16rem] md:min-h-[25rem]">
          {isLive && parent ? (
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://player.twitch.tv/?channel=${CHANNEL_NAME}&parent=${parent}&muted=false`}
              allowFullScreen
              title="Twitch Live Player"
            />
          ) : !isPodcast ? (
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube.com/embed/${episode.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={thumbnail}
              alt={episode.title}
              className="h-full w-full object-cover"
              style={
                {
                  viewTransitionName: `saru-${episode.guid}`,
                } as CSSProperties
              }
            />
          )}
        </figure>

        <div className="flex flex-1 flex-col justify-center backdrop-blur-sm">
          {isLive ? (
            <>
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-red-400">
                  NOW ON AIR
                </span>
              </div>
              <h2 className="mb-3 text-2xl font-extrabold leading-tight text-white md:text-4xl">
                火曜日のおフロ is Live!
              </h2>
              <div className="mb-6 flex items-center gap-2 text-sm text-white/70">
                <span>Streaming on Twitch</span>
              </div>
              <p className="mb-8 max-w-xl line-clamp-3 leading-relaxed text-white/80">
                現在生放送中です。コメントなどで参加する場合はTwitchへ！
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://www.twitch.tv/${CHANNEL_NAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-lg gap-2 rounded-none border-none bg-[#9146FF] text-white shadow-sm hover:bg-[#7e3bdc]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                  Watch on Twitch
                </a>
              </div>
            </>
          ) : (
            <>
              <span className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-200 opacity-70">
                Latest Episode
              </span>
              <h2 className="mb-3 text-2xl font-extrabold leading-tight text-white md:text-4xl">
                <span
                  style={
                    isPodcast
                      ? ({
                          viewTransitionName: `title-${episode.guid}`,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  {episode.title}
                </span>
              </h2>

              <div className="mb-6 flex items-center gap-2 text-sm text-white/70">
                <span>{date}</span>
              </div>

              {isPodcast ? (
                <div
                  className="mb-8 max-w-xl line-clamp-3 leading-relaxed text-white/80"
                  dangerouslySetInnerHTML={{ __html: episode.content }}
                />
              ) : (
                <p className="mb-8 max-w-xl line-clamp-3 leading-relaxed text-white/80">
                  {episode.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {isPodcast ? (
                  <button
                    className="btn btn-lg gap-2 rounded-none border-none bg-orange-200 text-black shadow-sm hover:bg-orange-300"
                    onClick={handlePodcastPlay}
                  >
                    <SvgPlayArrow className="h-6 w-6 fill-current" />
                    Listen Now
                  </button>
                ) : (
                  <>
                    <a
                      href={`https://www.youtube.com/watch/?v=${episode.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-lg gap-2 rounded-none border-none bg-orange-200 text-black shadow-sm hover:bg-orange-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.66 8.35c-.12.83-.17 1.7-.16 2.6V13c0 3.78.38 5.76 1.44 6.83.97.97 3 1.17 9.06 1.17 6.07 0 8.1-.2 9.07-1.17 1.06-1.07 1.43-3.05 1.43-6.83v-2.05c.01-.9-.04-1.77-.16-2.6C22 5.06 21.05 3 18.27 2.08 17.5 1.83 14.5 1.75 12 1.75s-5.5.08-6.27.33C2.95 3 2 5.06 1.66 8.35zM10 15l5-3-5-3v6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Watch Video
                    </a>
                    {transcriptHref != null && (
                      <Link
                        href={transcriptHref}
                        className="btn btn-lg rounded-none border-orange-200 text-orange-100 hover:bg-orange-100 hover:text-black"
                      >
                        Read Transcript
                      </Link>
                    )}
                  </>
                )}

                {isPodcast && (
                  <TransitionLink href={`/${episode.guid}`}>
                    <button className="btn btn-ghost rounded-none hover:bg-base-200">
                      View Details
                    </button>
                  </TransitionLink>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
