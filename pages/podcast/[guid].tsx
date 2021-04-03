import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import {
  EmptyPodcastEpisode,
  isPodcastEpisode,
  isPodcastEpisodes,
  PodcastEpisode,
} from "../../types";
import Parser from "rss-parser";
import React, { useMemo, FC } from "react";

type Props = { episode: PodcastEpisode };

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
        fallback: false,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    paths: [],
    fallback: false,
  };
};

type ContentProps = {
  content: string;
};

const EpisodeContent: FC<ContentProps> = (props) => {
  // TODO: dangerouslySetInnerHTML を外す
  // 外部の API から取得した値を dangerouslySetInnerHTML で出力している
  // 出力された HTML にスタイルをあてにくい
  // Anchor の RSS には、contentSnippet というフィールドがあるので、そっちを使うのもあり

  return (
    <>
      <div
        className="dangerousHTML"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </>
  );
};

const Page: NextPage<Props> = ({ episode }) => {
  const pubDateISOString = useMemo(() => {
    return new Date(Date.parse(episode.pubDate)).toISOString();
  }, [episode.pubDate]);

  const pubDateLocaleDateString = useMemo(() => {
    return new Date(Date.parse(episode.pubDate)).toLocaleDateString();
  }, [episode.pubDate]);

  return (
    <main>
      <h1 className="text-2xl text-gray-800">{episode.title}</h1>

      <time className="mt-16 text-sm text-gray-500" dateTime={pubDateISOString}>
        {pubDateLocaleDateString}
      </time>

      <div className="mt-8">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- 代替コンテンツを用意できなていない*/}
        <audio controls src={episode.enclosure.url} />
      </div>

      <section className="mt-8">
        <h2 className="sr-only">概要</h2>

        <EpisodeContent content={episode.content} />
      </section>
    </main>
  );
};

export default Page;
