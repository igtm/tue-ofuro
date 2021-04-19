import Link from "next/link";
import { VFC } from "react";
import { useFloatingPlayDispatchContext } from "../../context/FloatingPlayAreaContext";
import { PodcastEpisode } from "../../types";
import { fmtPrettyJPTime } from "../../utilities/fmtPrettyJPTime";
import { SvgPlayArrow } from "../atoms/SvgPlayArrow";

type Props = {
  episode: PodcastEpisode;
};

export const PodcastEpisodeListItem: VFC<Props> = (props) => {
  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();

  return (
    <li>
      <div className="flex gap-4">
        <div className="flex-shrink-0 relative w-20 h-20 rounded overflow-hidden">
          <img src="/saru.jpg" width={128} height={128} alt="" />

          <button
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-20 hover:bg-opacity-5"
            onClick={() => {
              updateFloatingPlayAreaState(props.episode);
            }}
          >
            <SvgPlayArrow className="w-10 h-10 fill-current text-gray-50" />
            <span className="sr-only">再生</span>
          </button>
        </div>

        <Link href={`/${props.episode.guid}`}>
          <a className="flex-grow hover:underline">
            <div className="grid gap-y-2">
              <div className="text-xs text-gray-500">
                {new Date(
                  Date.parse(props.episode.pubDate)
                ).toLocaleDateString()}
              </div>

              <div className="text-base text-gray-900">
                {props.episode.title}
              </div>

              <div className="text-xs text-gray-900">
                {fmtPrettyJPTime(Number(props.episode.itunes.duration))}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </li>
  );
};
