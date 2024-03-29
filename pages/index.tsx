import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Parser from "rss-parser";
import { Paragraph } from "../components/atoms/Paragraph";
import { PodcastEpisodeListItem } from "../components/molecules/PodcastEpisodeListItem";
import { YouTubeEpisodeListItem } from "../components/molecules/YouTubeEpisodeListItem";
import {
  useCustomFontContext,
  useCustomFontDispatchContext,
} from "../context/CustomFont";
import {
  isPodcastEpisode,
  isPodcastEpisodes,
  isYouTubeEpisodes,
  PodcastEpisode,
  YouTubeEpisode,
} from "../types";
import { useScrollRestoration } from "../hooks/useScrollRestoration";

type Props = {
  episodes: (PodcastEpisode | YouTubeEpisode)[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  useScrollRestoration();
  const customFontContext = useCustomFontContext();
  const customFontDispatchContext = useCustomFontDispatchContext();

  return (
    <>
      <Head>
        <title>火曜日のおフロ</title>
      </Head>
      <main className="grid w-full gap-y-8">
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
            が、ゆるーくフロントエンド周りの気になった記事を紹介しながらお届けします。おフロは「フロントエンド」から来てます。ほぼ毎週土曜日更新。
            <br />
          </Paragraph>

          <Paragraph>
            <span className="flex items-center">
              <input
                id="custom-font"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                checked={customFontContext.activated}
                onChange={customFontDispatchContext.toggle}
              />
              <label htmlFor="custom-font" className="ml-2 text-sm">
                オリジナルフォントを有効にする
              </label>
            </span>

            <span className="text-sm">
              YouTube Liveで作成したフォントで表示されます。
              <Link
                href="/Tue_ofuro_kana-Regular.otf"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                ひらがなだけ自作フォント
              </Link>
            </span>
          </Paragraph>
        </div>

        <ul className="grid gap-y-8">
          {episodes.map((e) => {
            if (isPodcastEpisode(e)) {
              return <PodcastEpisodeListItem key={e.guid} episode={e} />;
            }
            return <YouTubeEpisodeListItem key={e.videoId} episode={e} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default Page;

const parser: Parser = new Parser();

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    // https://developers.google.com/youtube/v3/docs/search/list?hl=ja
    // 使用量制限 https://developers.google.com/youtube/v3/getting-started?hl=ja#quota
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&order=date&channelId=UCEpBWGBKeawXcNupDevCmSg&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await res.json();
    const videos =
      data.items?.map((item: any) => ({
        videoId: item.id.videoId,
        isLive: item.snippet.liveBroadcastContent === "live",
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        pubDate: item.snippet.publishedAt,
      })) ?? [];

    const feed = await parser.parseURL(
      "https://anchor.fm/s/2b3dd74c/podcast/rss"
    );

    if (isYouTubeEpisodes(videos) && isPodcastEpisodes(feed.items)) {
      // マージ&ソートする
      const videoAndFeed: (PodcastEpisode | YouTubeEpisode)[] = [
        ...videos,
        ...feed.items,
      ];
      videoAndFeed.sort((x, y) => {
        return Date.parse(y.pubDate) - Date.parse(x.pubDate);
      });
      return {
        props: {
          episodes: videoAndFeed,
        },
        revalidate: 3600,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      episodes: [],
    },
    revalidate: 3600,
  };
};
