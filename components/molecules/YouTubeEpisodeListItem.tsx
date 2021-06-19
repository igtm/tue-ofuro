import { VFC } from "react";
import { YouTubeEpisode } from "../../types";

type Props = {
  episode: YouTubeEpisode;
};

export const YouTubeEpisodeListItem: VFC<Props> = (props) => {
  return (
    <li>
      <a
        href={`https://www.youtube.com/watch/?v=${props.episode.videoId}`}
        target="_blank"
        className="flex-grow hover:underline" rel="noreferrer"
      >
        <div className="flex gap-4">
          <div className="relative flex-shrink-0 w-20 overflow-hidden rounded h-15">
            <img
              src={props.episode.thumbnailUrl}
              width={480}
              height={360}
              alt=""
            />
            {props.episode.isLive ? (
              <span className="absolute bottom-0 right-0 pl-1 pr-1 text-xs text-white bg-red-500">
                LIVE
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="grid gap-y-2">
            <div className="text-xs text-gray-500">{new Date(props.episode.pubDate).toLocaleString()}</div>
            <div className="text-base text-gray-900">{props.episode.title}</div>
          </div>
        </div>
      </a>
    </li>
  );
};
