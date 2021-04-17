import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import Parser from "rss-parser";
import { useFloatingPlayDispatchContext } from "../context/FloatingPlayAreaContext";
import { isPodcastEpisodes, PodcastEpisode } from "../types";
import { SvgPlayArrow } from "../components/atoms/SvgPlayArrow";
import { Paragraph } from "../components/atoms/Paragraph";

type Props = {
  episodes: PodcastEpisode[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  return (
    <>
      <Head>
        <title>火曜日のおフロ</title>
      </Head>
      <main className="w-full grid gap-y-8">
        <div className="grid gap-y-4">
          <h1>火曜日のおフロ</h1>

          <Paragraph>
            <a
              className="underline hover:nounderline"
              href="https://github.com/igtm"
              target="_blank"
              rel="noreferrer"
            >@igtm</a>
            ,{" "}
            <a
              className="underline hover:nounderline"
              href="https://github.com/t-gyo"
              target="_blank"
              rel="noreferrer"
            >@t-gyo</a>
            ,{" "}
            <a
              className="underline hover:nounderline"
              href="https://github.com/ymdarake"
              target="_blank"
              rel="noreferrer"
            >@ymdarake</a>{" "}
            が、ゆるーくフロントエンド周りの気になった記事を紹介しながらお届けします。おフロは「フロントエンド」から来てます。毎週土曜日更新。
          </Paragraph>
        </div>

        <ul className="grid gap-y-8">
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
      <div className="flex gap-4">
        <div className="flex-shrink-0 relative w-20 h-20 rounded overflow-hidden">
          <img src="/saru.jpg" width={128} height={128} />

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

function fmtPrettyJPTime(sec: number): string {
  let hour = Math.floor(sec / 3600);
  let min = `${Math.floor(sec / 60) % 60}`.padStart(2, "0");
  let secOnly = `${sec % 60}`.padStart(2, "0");
  let ret = "";
  if (hour > 0) {
    ret += `${hour}:`;
  }
  ret += `${min}:${secOnly}`;
  return ret;
}
