import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
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
      <main className="grid gap-8">
        <section className="grid gap-5">
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
            <Link
              href={transcript.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="link link-primary"
            >
              YouTubeで開く
            </Link>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {transcript.title}
            </h1>
            <p className="text-base-content/70 mt-3">
              transcript をクリックすると上の YouTube player がその時刻へ移動します。再生中の行は自動でハイライトされます。
            </p>
            {searchQuery ? (
              <p className="text-sm text-base-content/60 mt-2">
                「{searchQuery}」に一致する cue: {matchingCueCount}
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid gap-5">
          <TranscriptPlayer
            title={transcript.title}
            videoId={transcript.videoId}
            initialStartSec={initialStartSec}
            seekToSec={seekToSec}
            onCurrentTimeChange={setCurrentTime}
          />
        </section>

        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Transcript</h2>
            <Link href="/transcripts" className="link link-secondary">
              一覧へ戻る
            </Link>
          </div>

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
        </section>
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
      transcript: transcript,
    },
  };
};

export default Page;
