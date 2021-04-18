import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Parser from "rss-parser";
import { Paragraph } from "../components/atoms/Paragraph";
import { PodcastEpisodeListItem } from "../components/molecules/PodcastEpisodeListItem";
import { isPodcastEpisodes, PodcastEpisode } from "../types";

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
            >
              @igtm
            </a>
            ,{" "}
            <a
              className="underline hover:nounderline"
              href="https://github.com/t-gyo"
              target="_blank"
              rel="noreferrer"
            >
              @t-gyo
            </a>
            ,{" "}
            <a
              className="underline hover:nounderline"
              href="https://github.com/ymdarake"
              target="_blank"
              rel="noreferrer"
            >
              @ymdarake
            </a>{" "}
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
