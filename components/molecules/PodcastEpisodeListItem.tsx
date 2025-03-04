import Link from "next/link";
import { VFC, useState } from "react";
import { useFloatingPlayDispatchContext } from "../../context/FloatingPlayAreaContext";
import { formatAsJSTDateTime, parseDate } from "../../lib/date";
import { PodcastEpisode } from "../../types";
import { SvgPlayArrow } from "../atoms/SvgPlayArrow";
import { TransitionLink } from "../atoms/TransitionLink";

type Props = {
  episode: PodcastEpisode;
};

export const PodcastEpisodeListItem: VFC<Props> = (props) => {
  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();
  return (
    <li>
      <div className="flex gap-4">
        <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded">
          <img
            src="/saru.jpg"
            width={128}
            height={128}
            alt=""
            //@ts-expect-error nosupported
            style={{ viewTransitionName: `saru-${props.episode.guid}` }}
          />

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

        <TransitionLink href={`/${props.episode.guid}`}>
          <div
            className="grid gap-y-2"
            //@ts-expect-error nosupported
            style={{ viewTransitionName: `title-${props.episode.guid}` }}
          >
            <div className="text-xs text-primary-500">
              {formatAsJSTDateTime(parseDate(props.episode.pubDate))}
            </div>

            <div className="text-lg text-primary-900">
              {props.episode.title}
            </div>

            <div className="text-xs text-primary-900">
              {props.episode.itunes.duration}
            </div>
          </div>
        </TransitionLink>
      </div>
    </li>
  );
};
