import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { isPodcastEpisodes, PodcastEpisode } from "../../types";
import Parser from "rss-parser";

type Props = {
  episodes: PodcastEpisode[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  return (
    <div>
      <ul>
        {episodes.map((e) => (
          <li key={e.guid} className="p-4">
            <div className="text-gray-500">
              {new Date(Date.parse(e.pubDate)).toLocaleDateString()}
            </div>
            <Link href={`/podcast/${e.guid}`}>
              <a>{e.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

const parser: Parser = new Parser();

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const feed = await parser.parseURL(
      "https://anchor.fm/s/2b3dd74c/podcast/rss"
    );
    if (isPodcastEpisodes(feed.items)) {
      return {
        props: {
          episodes: feed.items as PodcastEpisode[],
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      episodes: [],
    },
  };
};
