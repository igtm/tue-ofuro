import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Parser from "rss-parser";
import { Paragraph } from "../components/atoms/Paragraph";

import {
  useCustomFontContext,
  useCustomFontDispatchContext,
} from "../context/CustomFont";
import {
  getTranscriptHrefByVideoId,
} from "../lib/transcripts";
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
  transcriptHrefByVideoId: Record<string, string>;
};

type YouTubeSearchResponse = {
  items?: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      liveBroadcastContent: string;
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }>;
};

import { useState } from "react";
import { HeroEpisode } from "../components/organisms/HeroEpisode";
import { EpisodeCard } from "../components/molecules/EpisodeCard";
const Page: NextPage<Props> = ({ episodes, transcriptHrefByVideoId }) => {
  useScrollRestoration();
  const customFontContext = useCustomFontContext();
  const customFontDispatchContext = useCustomFontDispatchContext();

  const [visibleCount, setVisibleCount] = useState(7); // 1 Hero + 6 Cards

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const heroEpisode = episodes[0];
  const listEpisodes = episodes.slice(1, visibleCount);
  const hasMore = visibleCount < episodes.length;
  const heroTranscriptHref =
    heroEpisode != null && !isPodcastEpisode(heroEpisode)
      ? transcriptHrefByVideoId[heroEpisode.videoId]
      : undefined;

  return (
    <>
      <Head>
        <title>火曜日のおフロ</title>
      </Head>
      <main className="w-full">
        {/* Full Width Hero Section */}
        {heroEpisode && (
          <div className="w-full mb-12">
             <HeroEpisode
               episode={heroEpisode}
               transcriptHref={heroTranscriptHref}
             />
          </div>
        )}

        {/* Centered Content Container */}
        <div className="max-w-screen-xl mx-auto px-4">
             
            {/* Recent Episodes Grid */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                        Recent Episodes
                    </h2>
                    
                    {/* Font Toggle moved here for utility */}
                     <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <span className="label-text text-xs opacity-70">Original Font</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-xs"
                            checked={customFontContext.activated}
                            onChange={customFontDispatchContext.toggle}
                        />
                      </label>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {listEpisodes.map((e) => (
                    <div key={isPodcastEpisode(e) ? e.guid : e.videoId}>
                        <EpisodeCard
                          episode={e}
                          transcriptHref={
                            isPodcastEpisode(e)
                              ? undefined
                              : transcriptHrefByVideoId[e.videoId]
                          }
                        />
                    </div>
                ))}
                </div>
            </div>
            
            {/* Load More */}
            {hasMore && (
                <div className="flex justify-center py-8">
                    <button 
                        className="btn btn-outline btn-wide"
                        onClick={handleLoadMore}
                    >
                        View More Episodes
                    </button>
                </div>
            )}

            {/* Look & Feel / Intro moved to bottom */}
            <div className="mt-24 pt-8 border-t border-base-200">
                 <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">About 火曜日のおフロ</h3>
                    <Paragraph>
                        <span className="text-base-content/70">
                            <a className="link link-primary no-underline hover:underline" href="https://github.com/igtm" target="_blank" rel="noreferrer">@igtm</a>,{" "}
                            <a className="link link-primary no-underline hover:underline" href="https://github.com/t-gyo" target="_blank" rel="noreferrer">@t-gyo</a>,{" "}
                            <a className="link link-primary no-underline hover:underline" href="https://github.com/ymdarake" target="_blank" rel="noreferrer">@ymdarake</a>{" "}
                            が、ゆるーくフロントエンド周りの気になった記事を紹介しながらお届けします。
                        </span>
                    </Paragraph>
                 </div>
                 
                 <div className="p-4 bg-base-200 rounded-lg text-sm text-base-content/70">
                     <p>
                       YouTube Liveで作成したフォントで表示されます。
                      <Link
                        href="/Tue_ofuro_kana-Regular.otf"
                        className="link link-secondary ml-1"
                      >
                        ひらがなだけ自作フォント
                      </Link>
                     </p>
                </div>
            </div>
        </div>
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
    const data = (await res.json()) as YouTubeSearchResponse;
    const videos =
      data.items?.map((item) => ({
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
          transcriptHrefByVideoId: getTranscriptHrefByVideoId(),
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
      transcriptHrefByVideoId: {},
    },
    revalidate: 3600,
  };
};
