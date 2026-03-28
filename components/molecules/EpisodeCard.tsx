import Link from "next/link";
import { CSSProperties, VFC } from "react";
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

export const EpisodeCard: VFC<Props> = ({ episode, transcriptHref }) => {
  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();
  const isPodcast = isPodcastEpisode(episode);
  const date = formatAsJSTDateTime(parseDate(episode.pubDate));
  const podcastThumbnailStyle = isPodcast
    ? ({ viewTransitionName: `saru-${episode.guid}` } as CSSProperties)
    : undefined;
  const podcastTitleStyle = isPodcast
    ? ({ viewTransitionName: `title-${episode.guid}` } as CSSProperties)
    : undefined;

  const thumbnail = isPodcast ? "/saru.jpg" : episode.thumbnailUrl;

  const handlePodcastPlay = () => {
    if (isPodcast) {
      updateFloatingPlayAreaState(episode);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-base-200">
      <figure className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          style={podcastThumbnailStyle}
        />
        <div className="absolute top-2 left-2 badge badge-neutral shadow-md">
          {isPodcast ? "#Podcast" : "#YouTube"}
        </div>

        {!isPodcast && episode.isLive && (
          <div className="absolute top-2 right-2 badge badge-error text-white animate-pulse">
            LIVE
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        <div className="text-xs font-semibold text-base-content/60 mb-1">
          {date}
        </div>
        <h2
          className="card-title text-lg leading-snug mb-3 line-clamp-2 min-h-[3.5rem]"
          title={episode.title}
        >
          <span style={podcastTitleStyle}>{episode.title}</span>
        </h2>

        <div className="card-actions justify-end mt-auto">
          {isPodcast ? (
            <div className="flex w-full gap-2">
              <button
                className="btn btn-primary btn-sm flex-1 text-white"
                onClick={handlePodcastPlay}
              >
                <SvgPlayArrow className="w-4 h-4 fill-current" />
                Listen
              </button>
              <TransitionLink href={`/${episode.guid}`}>
                <button className="btn btn-outline btn-sm">Details</button>
              </TransitionLink>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <a
                href={`https://www.youtube.com/watch/?v=${episode.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-neutral btn-sm flex-1"
              >
                Watch
              </a>
              {transcriptHref != null && (
                <Link href={transcriptHref} className="btn btn-outline btn-sm flex-1">
                  Transcript
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
