import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Parser from "rss-parser";
import { useFloatingPlayDispatchContext } from "../context/FloatingPlayAreaContext";
import { isPodcastEpisodes, PodcastEpisode } from "../types";
import Head from "next/head";

type Props = {
  episodes: PodcastEpisode[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  return (
    <>
      <Head>
        ​ <title>火曜日のおフロ</title>​{" "}
      </Head>
      <main className="w-full">
        <div className="mb-6">
          <h1>火曜日のおフロ</h1>
          <p>
            ​{" "}
            <a href="https://github.com/igtm" target="_blank" rel="noreferrer">
              @igtm
            </a>
            , ​{" "}
            <a href="https://github.com/t-gyo" target="_blank" rel="noreferrer">
              @t-gyo
            </a>
            , ​{" "}
            <a
              href="https://github.com/ymdarake"
              target="_blank"
              rel="noreferrer"
            >
              @ymdarake
            </a>
            ​
            が、ゆるーくフロントエンド周りの気になった記事を紹介しながらお届けします。おフロは「フロントエンド」から来てます。毎週土曜日更新。
            ​{" "}
          </p>
        </div>
        <ul>
          {episodes.map((e) => (
            <PodcastEpisodeListItem key={e.guid} episode={e} />
          ))}
        </ul>
      </main>
    </>
  );
};

// TODO: あとでコンポーネントにする
type ListItemProps = {
  key: string;
  episode: PodcastEpisode;
};

const PodcastEpisodeListItem: FC<ListItemProps> = (props) => {
  const {
    updateFloatingPlayAreaState,
    clearFloatingPlayAreaState,
  } = useFloatingPlayDispatchContext();

  return (
    <li>
      <div className="flex flex-row">
        <div className="flex-shrink-0 self-center">
          <Image src="/saru.jpg" width={128} height={128} />
        </div>
        <div>
          <Link href={`/${props.episode.guid}`}>
            <a>{props.episode.title}</a>
          </Link>
          <div className="text-gray-500">
            {new Date(Date.parse(props.episode.pubDate)).toLocaleDateString()}
          </div>
          <div className="w-80 m-4 flex flex-col">
            <button
              onClick={() => {
                updateFloatingPlayAreaState(props.episode);
              }}
            >
              play
            </button>
            <button
              onClick={() => {
                clearFloatingPlayAreaState();
              }}
            >
              pause
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Page;

const parser: Parser = new Parser();

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    // const res = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCEpBWGBKeawXcNupDevCmSg&key=${process.env.YOUTUBE_API_KEY}`
    // );
    // const data = await res.json();
    // console.log(data.items);
    // console.log(data.items[0].id);
    // console.log(data.items[0].id.videoId);
    // console.log(data.items[0].snippet);
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
