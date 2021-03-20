import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import {
  EmptyPodcastEpisode,
  isPodcastEpisode,
  PodcastEpisode,
} from "../../types";
import Parser from "rss-parser";

type Props = { episode: PodcastEpisode };

const getAllEpisodeIds = async (): Promise<string[]> => {
  const res = await fetch(`${process.env.WEBAPP_URL}/api/podcast`);
  return (await res.json()).items.map(
    (episode: PodcastEpisode) => episode.guid
  );
};

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
  const guids = await getAllEpisodeIds();

  return {
    paths: guids.map((guid) => ({ params: { guid } })),
    fallback: false,
  };
};

const Page: NextPage<Props> = ({ episode }) => {
  return (
    <div>
      <div>{episode.pubDate}</div>
      <div>{episode.title}</div>
    </div>
  );
};

export default Page;
