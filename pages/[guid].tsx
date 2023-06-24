import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import React, { FC, useMemo } from "react";
import Parser from "rss-parser";
import { DangerousHTML } from "../components/atoms/DangerousHTML";
import { SvgPlayArrow } from "../components/atoms/SvgPlayArrow";
import { useFloatingPlayDispatchContext } from "../context/FloatingPlayAreaContext";
import {
  EmptyPodcastEpisode,
  isPodcastEpisode,
  isPodcastEpisodes,
  PodcastEpisode,
} from "../types";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

// getStaticPaths において fallback: true を指定するので、props は空になることがある
type Props = { episode?: PodcastEpisode };

const parser: Parser = new Parser();

// revalidate する
export const getStaticProps: GetStaticProps<Props> = async (
  ctx: GetStaticPropsContext
) => {
  const guid = ctx.params?.guid;
  try {
    const feed = await parser.parseURL(
      "https://anchor.fm/s/2b3dd74c/podcast/rss"
    );
    const episode = feed.items.find((f) => f.guid === guid);
    if (isPodcastEpisode(episode)) {
      return {
        props: {
          episode: episode ?? EmptyPodcastEpisode,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      episode: EmptyPodcastEpisode,
    },
  };
};

export const getStaticPaths = async () => {
  try {
    const feed = await parser.parseURL(
      "https://anchor.fm/s/2b3dd74c/podcast/rss"
    );
    if (isPodcastEpisodes(feed.items)) {
      const guids = feed.items.map((item) => item.guid);
      return {
        paths: guids.map((guid) => ({ params: { guid } })),
        fallback: true,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    paths: [],
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
    fallback: true,
  };
};

const Page: NextPage<Props> = ({ episode }) => {
  const pubDateISOString = useMemo(() => {
    if (episode?.pubDate == null) {
      return "";
    }

    return new Date(Date.parse(episode.pubDate)).toISOString();
  }, [episode?.pubDate]);

  const pubDateLocaleDateString = useMemo(() => {
    if (episode?.pubDate == null) {
      return "";
    }
    return format(
      parseISO(new Date(episode.pubDate).toISOString()),
      "yyyy/MM/dd",
      { locale: ja }
    );
  }, [episode?.pubDate]);

  const { updateFloatingPlayAreaState } = useFloatingPlayDispatchContext();

  if (episode == null) {
    return <>loading...</>;
  }

  return (
    <main>
      <div className="flex gap-x-4">
        <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded">
          <img src="/saru.jpg" width={128} height={128} alt="" />

          <button
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-20 hover:bg-opacity-5"
            onClick={() => {
              updateFloatingPlayAreaState(episode);
            }}
          >
            <SvgPlayArrow className="w-10 h-10 fill-primary text-primary-50" />
            <span className="sr-only">再生</span>
          </button>
        </div>

        <div className="grid">
          <time
            className="text-sm text-primary-500"
            dateTime={pubDateISOString}
          >
            {pubDateLocaleDateString}
          </time>

          <h1 className="text-2xl text-primary-800">{episode.title}</h1>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="sr-only">概要</h2>

        <DangerousHTML content={episode.content} />
      </section>
    </main>
  );
};

export default Page;
