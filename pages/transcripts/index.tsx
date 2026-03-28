import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useMemo } from "react";
import { formatSecondsAsTimestamp } from "../../lib/transcript-format";
import { getAllTranscripts } from "../../lib/transcripts";
import { TranscriptEpisode, TranscriptSearchHit } from "../../types";

type Props = {
  transcripts: TranscriptEpisode[];
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

const Page: NextPage<Props> = ({ transcripts }) => {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";

  const hits = useMemo<TranscriptSearchHit[]>(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (normalizedQuery.length === 0) {
      return [];
    }

    return transcripts.flatMap((transcript) => {
      return transcript.cues
        .filter((cue) =>
          normalizeSearchText(cue.text).includes(normalizedQuery)
        )
        .slice(0, 20)
        .map((cue) => ({
          videoId: transcript.videoId,
          episodeNumber: transcript.episodeNumber,
          title: transcript.title,
          thumbnailUrl: transcript.thumbnailUrl,
          cueIndex: cue.index,
          startSec: cue.startSec,
          endSec: cue.endSec,
          text: cue.text,
        }));
    });
  }, [query, transcripts]);

  return (
    <>
      <Head>
        <title>書き起こし検索 | 火曜日のおフロ</title>
      </Head>
      <main className="grid gap-8">
        <section className="rounded-3xl bg-neutral text-neutral-content p-6 md:p-8 shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-200/80 mb-3">
            Transcript Search
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            書き起こしからエピソードを探す
          </h1>
          <p className="text-sm md:text-base text-neutral-content/75 max-w-2xl">
            上の検索窓からキーワードを入れると、収録済み transcript の中から該当箇所を探せます。結果をクリックすると、その時刻から YouTube と同期した transcript ページへ移動します。
          </p>
        </section>

        {query.trim().length === 0 ? (
          <section className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Transcripts</h2>
              <span className="text-sm text-base-content/60">
                {transcripts.length} episodes
              </span>
            </div>
            <div className="grid gap-4">
              {transcripts.map((transcript) => (
                <Link
                  key={transcript.videoId}
                  href={`/transcripts/${transcript.videoId}`}
                  className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="card-body md:flex-row md:items-center gap-5">
                    <img
                      src={transcript.thumbnailUrl}
                      alt={transcript.title}
                      className="w-full md:w-56 aspect-video rounded-xl object-cover"
                    />
                    <div className="grid gap-3">
                      <div className="flex flex-wrap gap-2 items-center">
                        {transcript.episodeNumber != null ? (
                          <span className="badge badge-primary text-white">
                            #{transcript.episodeNumber}
                          </span>
                        ) : null}
                        <span className="badge badge-outline">
                          {transcript.cues.length} cues
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{transcript.title}</h3>
                      <p className="text-sm text-base-content/70">
                        {transcript.chapters.length} chapters /{" "}
                        {formatSecondsAsTimestamp(transcript.durationSec)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                「{query}」の検索結果
              </h2>
              <span className="text-sm text-base-content/60">
                {hits.length} hits
              </span>
            </div>
            <div className="grid gap-4">
              {hits.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-base-300 p-8 text-base-content/70">
                  該当する transcript は見つかりませんでした。
                </div>
              ) : (
                hits.map((hit) => (
                  <Link
                    key={`${hit.videoId}-${hit.cueIndex}`}
                    href={`/transcripts/${hit.videoId}?t=${Math.floor(
                      hit.startSec
                    )}&q=${encodeURIComponent(query)}#cue-${hit.cueIndex}`}
                    className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="card-body gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
                        {hit.episodeNumber != null ? (
                          <span className="badge badge-secondary">
                            #{hit.episodeNumber}
                          </span>
                        ) : null}
                        <span>{formatSecondsAsTimestamp(hit.startSec)}</span>
                      </div>
                      <h3 className="font-bold text-lg">{hit.title}</h3>
                      <p className="text-base leading-7">
                        {highlightText(hit.text, query)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      transcripts: getAllTranscripts(),
    },
  };
};

export default Page;
