import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { TranscriptPlayer } from "../../components/organisms/TranscriptPlayer";
import { formatSecondsAsTimestamp } from "../../lib/transcript-format";
import {
  getAllTranscripts,
  getTranscriptByVideoId,
} from "../../lib/transcripts";
import { TranscriptEpisode } from "../../types";

type Props = {
  transcript: TranscriptEpisode;
};

function normalizeSearchText(text: string): string {
  return text.trim().toLocaleLowerCase("ja-JP");
}

function highlightText(text: string, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (normalizedQuery.length === 0) {
    return text;
  }

  const normalizedText = text.toLocaleLowerCase("ja-JP");
  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const matchIndex = normalizedText.indexOf(normalizedQuery, cursor);
    if (matchIndex === -1) {
      parts.push(text.slice(cursor));
      break;
    }

    if (matchIndex > cursor) {
      parts.push(text.slice(cursor, matchIndex));
    }

    parts.push(
      <mark
        key={`${text}-${matchIndex}`}
        className="bg-orange-200 text-black px-1 rounded"
      >
        {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
      </mark>
    );

    cursor = matchIndex + normalizedQuery.length;
  }

  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

const Page: NextPage<Props> = ({ transcript }) => {
  const router = useRouter();
  const searchQuery = typeof router.query.q === "string" ? router.query.q : "";
  const initialStartSec = useMemo(() => {
    if (typeof router.query.t !== "string") {
      return 0;
    }

    const seconds = Number(router.query.t);
    if (Number.isNaN(seconds)) {
      return 0;
    }

    return Math.max(0, seconds);
  }, [router.query.t]);

  const [currentTime, setCurrentTime] = useState(initialStartSec);
  const [seekToSec, setSeekToSec] = useState<number | null>(initialStartSec);
  const transcriptListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTime(initialStartSec);
    setSeekToSec(initialStartSec);
  }, [initialStartSec]);

  const activeCueIndex = useMemo(() => {
    const activeCue = transcript.cues.find((cue, index) => {
      const nextCue = transcript.cues[index + 1];
      const cueEnd = nextCue?.startSec ?? cue.endSec;
      return currentTime >= cue.startSec && currentTime < cueEnd;
    });

    return activeCue?.index;
  }, [currentTime, transcript.cues]);

  // アクティブな cue が変わったとき、スクロール領域内で自動スクロール
  useEffect(() => {
    if (activeCueIndex == null || !transcriptListRef.current) {
      return;
    }

    const el = transcriptListRef.current.querySelector(
      `#cue-${activeCueIndex}`
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeCueIndex]);

  const matchingCueCount = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);
    if (normalizedQuery.length === 0) {
      return 0;
    }

    return transcript.cues.filter((cue) =>
      normalizeSearchText(cue.text).includes(normalizedQuery)
    ).length;
  }, [searchQuery, transcript.cues]);

  const handleSeek = (seconds: number, cueIndex?: number) => {
    setCurrentTime(seconds);
    setSeekToSec(seconds);

    const nextUrl = `/transcripts/${transcript.videoId}?t=${Math.floor(
      seconds
    )}${
      searchQuery
        ? `&q=${encodeURIComponent(searchQuery)}`
        : ""
    }${cueIndex != null ? `#cue-${cueIndex}` : ""}`;

    void router.replace(nextUrl, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  return (
    <>
      <Head>
        <title>{transcript.title} | Transcript | 火曜日のおフロ</title>
      </Head>
      {/* 
        レイアウト:
        - モバイル: 縦積み（上: 動画、下: transcript スクロール）
        - lg 以上: 左右2カラム（左: 動画+メタ情報、右: transcript スクロール）
      */}
      <main className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6">
        {/* 左カラム: YouTube プレーヤー + メタ情報 */}
        <div className="shrink-0 lg:shrink lg:w-1/2 xl:w-3/5 lg:flex lg:flex-col lg:py-2">
          {/* YouTube プレーヤー - lg以上では残りの高さに収まる */}
          <section className="mb-4 lg:flex-1 lg:min-h-0">
            <TranscriptPlayer
              title={transcript.title}
              videoId={transcript.videoId}
              initialStartSec={initialStartSec}
              seekToSec={seekToSec}
              onCurrentTimeChange={setCurrentTime}
            />
          </section>

          {/* メタ情報 */}
          <section className="grid gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {transcript.episodeNumber != null ? (
                <span className="badge badge-primary text-white">
                  #{transcript.episodeNumber}
                </span>
              ) : null}
              <span className="badge badge-outline">
                {transcript.cues.length} cues
              </span>
              <span className="badge badge-outline">
                {formatSecondsAsTimestamp(transcript.durationSec)}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {transcript.title}
            </h1>

            {searchQuery ? (
              <p className="text-sm text-base-content/60">
                「{searchQuery}」に一致する cue: {matchingCueCount}
              </p>
            ) : null}

            <p className="text-sm text-base-content/50 hidden lg:block">
              transcript をクリックすると YouTube player がその時刻へ移動します。再生中の行は自動でハイライトされます。
            </p>
          </section>
        </div>

        {/* モバイルのみ: 区切り線 */}
        <div className="border-b border-base-300 lg:hidden" />

        {/* 右カラム: Transcript リスト（スクロール） */}
        <div
          ref={transcriptListRef}
          className="flex-1 overflow-y-auto py-2 lg:w-1/2 xl:w-2/5 lg:border-l lg:border-base-300 lg:pl-6"
        >
          <div className="grid gap-3">
            {transcript.cues.map((cue) => {
              const isActive = cue.index === activeCueIndex;
              const isMatched =
                searchQuery.length > 0 &&
                normalizeSearchText(cue.text).includes(
                  normalizeSearchText(searchQuery)
                );

              return (
                <button
                  id={`cue-${cue.index}`}
                  key={cue.index}
                  type="button"
                  onClick={() => handleSeek(cue.startSec, cue.index)}
                  className={`w-full text-left rounded-2xl border px-4 py-4 transition-all ${
                    isActive
                      ? "border-orange-300 bg-orange-50 shadow-lg"
                      : isMatched
                      ? "border-orange-200 bg-base-100 shadow-md"
                      : "border-base-300 bg-base-100 hover:border-base-content/30 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-sm font-mono text-base-content/60 min-w-[4.5rem] pt-1">
                      {formatSecondsAsTimestamp(cue.startSec)}
                    </div>
                    <div className="flex-1 text-base leading-8">
                      {highlightText(cue.text, searchQuery)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const transcripts = getAllTranscripts();

  return {
    paths: transcripts.map((transcript) => ({
      params: {
        videoId: transcript.videoId,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const videoId = context.params?.videoId;
  if (typeof videoId !== "string") {
    return {
      notFound: true,
    };
  }

  const transcript = getTranscriptByVideoId(videoId);
  if (!transcript) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      transcript: JSON.parse(JSON.stringify(transcript)) as TranscriptEpisode,
    },
  };
};

export default Page;
