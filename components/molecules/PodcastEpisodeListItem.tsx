import Link from "next/link";
import { VFC } from "react";
import { useFloatingPlayDispatchContext } from "../../context/FloatingPlayAreaContext";
import { PodcastEpisode } from "../../types";
import { SvgPlayArrow } from "../atoms/SvgPlayArrow";

type Props = {
  episode: PodcastEpisode;
};

export const PodcastEpisodeListItem: VFC<Props> = (props) => {
  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();
  return (
    <li>
      <div className="flex gap-4">
        <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded">
          <img src="/saru.jpg" width={128} height={128} alt="" />

          <button
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-20 hover:bg-opacity-5"
            onClick={() => {
              updateFloatingPlayAreaState(props.episode);
            }}
          >
            <SvgPlayArrow className="w-10 h-10 fill-primary text-primary-50" />
            <span className="sr-only">再生</span>
          </button>
        </div>

        <Link
          href={`/${props.episode.guid}`}
          className="flex-grow hover:underline"
        >
          <div className="grid gap-y-2">
            <div className="text-xs text-primary-500">
              {new Date(props.episode.pubDate).toLocaleDateString()}
            </div>

            <div className="text-base text-primary-900">
              {props.episode.title}
            </div>

            <div className="text-xs text-primary-900">
              {props.episode.itunes.duration}
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};
