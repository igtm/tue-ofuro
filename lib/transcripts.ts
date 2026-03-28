import fs from "fs";
import path from "path";
import { TranscriptCue, TranscriptEpisode, TranscriptSearchHit } from "../types";

const normalizedTranscriptsDirectory = path.join(
  process.cwd(),
  "data",
  "transcripts"
);
const transcriptSourcesDirectory = path.join(
  process.cwd(),
  "data",
  "transcript-artifacts"
);

type RawTranscriptArtifact = {
  kind?: string;
  source?: {
    provider?: string;
    service?: string;
    model?: string;
  };
  target?: {
    videoId?: string;
    videoUrl?: string;
  };
  transcript?: {
    durationSec?: number;
    cues?: TranscriptCue[];
  };
};

type RawChapterArtifact = {
  kind?: string;
  target?: {
    episodeNumber?: number;
    videoId?: string;
    videoUrl?: string;
    title?: string;
  };
  chapterText?: string;
  chapters?: TranscriptEpisode["chapters"];
};

type ParsedChapterArtifact = {
  filePath: string;
  target?: {
    episodeNumber?: number;
    videoId?: string;
    videoUrl?: string;
    title?: string;
  };
  chapterText: string;
  chapters: TranscriptEpisode["chapters"];
};

type ParsedTranscriptSource = {
  filePath: string;
  videoId?: string;
  videoUrl?: string;
  episodeNumber?: number;
  title?: string;
  transcriptSource: string;
  durationSec: number;
  cues: TranscriptCue[];
};

function normalizeSearchText(text: string) {
  return text.trim().toLocaleLowerCase("ja-JP");
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function getFilePaths(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return getFilePaths(fullPath);
      }

      if (entry.isFile()) {
        return [fullPath];
      }

      return [];
    })
    .sort();
}

function isNormalizedTranscriptEpisode(value: unknown): value is TranscriptEpisode {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const transcript = value as Partial<TranscriptEpisode>;
  return (
    transcript.kind === "site-youtube-transcript" &&
    typeof transcript.videoId === "string" &&
    typeof transcript.title === "string" &&
    Array.isArray(transcript.cues) &&
    Array.isArray(transcript.chapters)
  );
}

function isRawTranscriptArtifact(
  value: unknown
): value is RawTranscriptArtifact {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const transcript = value as RawTranscriptArtifact;
  return (
    transcript.kind === "youtube-transcribe-artifact" &&
    Array.isArray(transcript.transcript?.cues)
  );
}

function isRawChapterArtifact(value: unknown): value is RawChapterArtifact {
  if (typeof value !== "object" || value == null) {
    return false;
  }

  const chapter = value as RawChapterArtifact;
  return (
    typeof chapter.chapterText === "string" ||
    Array.isArray(chapter.chapters)
  );
}

function inferVideoIdFromPath(filePath: string): string | undefined {
  const baseName = path.basename(filePath);
  const stem = baseName.replace(/\.[^.]+$/u, "");

  const prefixMatch = stem.match(/^([A-Za-z0-9_-]{11})(?=$|[-_.])/u);
  if (prefixMatch) {
    return prefixMatch[1];
  }

  const embeddedMatch = stem.match(
    /(?:^|[^A-Za-z0-9_-])([A-Za-z0-9_-]{11})(?=$|[-_.])/u
  );
  return embeddedMatch?.[1];
}

function inferEpisodeNumberFromPath(filePath: string): number | undefined {
  const baseName = path.basename(filePath);
  const explicitEpisodeMatch = baseName.match(/(?:^|[^0-9])#?(\d{3,4})(?:[^0-9]|$)/u);
  if (!explicitEpisodeMatch) {
    return undefined;
  }

  return Number(explicitEpisodeMatch[1]);
}

function buildVideoUrl(videoId?: string) {
  if (!videoId) {
    return "";
  }

  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildThumbnailUrl(videoId?: string) {
  if (!videoId) {
    return "/saru.jpg";
  }

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function buildFallbackTitle(videoId?: string, episodeNumber?: number) {
  if (episodeNumber != null) {
    return `Episode #${episodeNumber} transcript`;
  }

  if (videoId) {
    return `Transcript ${videoId}`;
  }

  return "Transcript";
}

function buildChapterText(chapters: TranscriptEpisode["chapters"]) {
  if (chapters.length === 0) {
    return "";
  }

  return chapters
    .map((chapter, index) => {
      const line = `${chapter.timestamp} ${chapter.title}`;
      return index === 0 ? `## Chapters\n${line}` : line;
    })
    .join("\n");
}

function parseChapterText(
  chapterText: string
): TranscriptEpisode["chapters"] {
  return chapterText
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== "## Chapters")
    .flatMap((line) => {
      const match = line.match(
        /^(?<timestamp>\d{1,2}:\d{2}(?::\d{2})?)\s+(?<title>.+)$/u
      );
      if (!match?.groups) {
        return [];
      }

      return [
        {
          startSec: parseTimestampToSeconds(match.groups.timestamp),
          timestamp: match.groups.timestamp,
          title: match.groups.title.trim(),
        },
      ];
    });
}

function parseTimestampToSeconds(timestamp: string) {
  const parts = timestamp
    .replace(",", ".")
    .split(":")
    .map((part) => Number(part));

  if (parts.some((part) => Number.isNaN(part))) {
    return 0;
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return parts[0] ?? 0;
}

function parseTimestampRange(range: string) {
  const [start, end] = range.split(/\s+-->\s+/u);
  return {
    startSec: parseTimestampToSeconds(start ?? "0"),
    endSec: parseTimestampToSeconds(end ?? "0"),
  };
}

function parseSrtContent(content: string): TranscriptCue[] {
  const blocks = content
    .trim()
    .split(/\n\s*\n/u)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.flatMap((block, blockIndex) => {
    const lines = block.split(/\r?\n/u).filter(Boolean);
    const timelineLine = lines.find((line) => line.includes("-->"));
    if (!timelineLine) {
      return [];
    }

    const textLines = lines.slice(lines.indexOf(timelineLine) + 1);
    const { startSec, endSec } = parseTimestampRange(timelineLine);

    return [
      {
        index: blockIndex + 1,
        startSec,
        endSec,
        text: textLines.join("\n").trim(),
      },
    ];
  });
}

function parseVttContent(content: string): TranscriptCue[] {
  const normalizedContent = content.replace(/^WEBVTT[\t ]*\r?\n/u, "");
  const blocks = normalizedContent
    .trim()
    .split(/\n\s*\n/u)
    .map((block) => block.trim())
    .filter(Boolean);

  let index = 1;
  return blocks.flatMap((block) => {
    const lines = block.split(/\r?\n/u).filter(Boolean);
    const timelineLine = lines.find((line) => line.includes("-->"));
    if (!timelineLine) {
      return [];
    }

    const timelineIndex = lines.indexOf(timelineLine);
    const textLines = lines.slice(timelineIndex + 1);
    const { startSec, endSec } = parseTimestampRange(timelineLine);

    const cue: TranscriptCue = {
      index,
      startSec,
      endSec,
      text: textLines.join("\n").trim(),
    };
    index += 1;
    return [cue];
  });
}

function parsePlainTextContent(content: string): TranscriptCue[] {
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const timedLines = trimmed
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line, index) => {
      const match = line.match(
        /^\[(?<start>\d+(?:\.\d+)?)s\s*->\s*(?<end>\d+(?:\.\d+)?)s\]\s*(?<text>.+)$/u
      );
      if (!match?.groups?.text) {
        return [];
      }

      return [
        {
          index: index + 1,
          startSec: Number(match.groups.start),
          endSec: Number(match.groups.end),
          text: match.groups.text.trim(),
        },
      ];
    });

  if (timedLines.length > 0) {
    return timedLines;
  }

  return [
    {
      index: 1,
      startSec: 0,
      endSec: 0,
      text: trimmed,
    },
  ];
}

function parseChunkTimeRangeFromPath(filePath: string) {
  const baseName = path.basename(filePath);

  const minuteRangeMatch = baseName.match(
    /(?:^|[_-])(?<start>\d{1,3})[_-](?<end>\d{1,3})min(?:[^a-zA-Z]|$)/u
  );
  if (minuteRangeMatch?.groups) {
    return {
      startSec: Number(minuteRangeMatch.groups.start) * 60,
      endSec: Number(minuteRangeMatch.groups.end) * 60,
    };
  }

  const startClockMatch = baseName.match(/start(?<clock>\d{6})(?:[^0-9]|$)/u);
  if (startClockMatch?.groups?.clock) {
    const clock = startClockMatch.groups.clock;
    const hours = Number(clock.slice(0, 2));
    const minutes = Number(clock.slice(2, 4));
    const seconds = Number(clock.slice(4, 6));
    return {
      startSec: hours * 3600 + minutes * 60 + seconds,
    };
  }

  return null;
}

function applyInferredTimeRangeToCues(
  cues: TranscriptCue[],
  inferredTimeRange: { startSec: number; endSec?: number } | null,
  ext: string
) {
  if (!inferredTimeRange) {
    return cues;
  }

  if (
    ext === ".txt" &&
    cues.length === 1 &&
    cues[0].startSec === 0 &&
    cues[0].endSec === 0
  ) {
    return cues.map((cue) => ({
      ...cue,
      startSec: inferredTimeRange.startSec,
      endSec:
        inferredTimeRange.endSec ??
        Math.max(inferredTimeRange.startSec, cue.endSec),
    }));
  }

  if (
    inferredTimeRange.startSec > 0 &&
    cues.length > 0 &&
    cues[0].startSec < inferredTimeRange.startSec
  ) {
    return cues.map((cue) => ({
      ...cue,
      startSec: cue.startSec + inferredTimeRange.startSec,
      endSec: cue.endSec + inferredTimeRange.startSec,
    }));
  }

  return cues;
}

function parseTextSource(filePath: string): ParsedTranscriptSource | null {
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, "utf8");
  const videoId = inferVideoIdFromPath(filePath);
  const episodeNumber = inferEpisodeNumberFromPath(filePath);
  const inferredTimeRange = parseChunkTimeRangeFromPath(filePath);

  let cues: TranscriptCue[] = [];
  const transcriptSource = `file:${ext.replace(".", "")}`;

  if (ext === ".srt") {
    cues = parseSrtContent(content);
  } else if (ext === ".vtt") {
    cues = parseVttContent(content);
  } else if (ext === ".txt") {
    cues = parsePlainTextContent(content);
  } else {
    return null;
  }

  if (cues.length === 0) {
    return null;
  }

  cues = applyInferredTimeRangeToCues(cues, inferredTimeRange, ext);
  const durationSec = cues[cues.length - 1]?.endSec ?? 0;

  return {
    filePath,
    videoId,
    videoUrl: buildVideoUrl(videoId),
    episodeNumber,
    transcriptSource,
    durationSec,
    cues,
  };
}

function parseChapterSource(
  filePath: string,
  rawChapterArtifact: RawChapterArtifact
): ParsedChapterArtifact | null {
  const parsedChapters = Array.isArray(rawChapterArtifact.chapters)
    ? rawChapterArtifact.chapters
    : parseChapterText(rawChapterArtifact.chapterText ?? "");

  const chapterText =
    typeof rawChapterArtifact.chapterText === "string" &&
    rawChapterArtifact.chapterText.trim().length > 0
      ? rawChapterArtifact.chapterText.trim()
      : buildChapterText(parsedChapters);

  const videoId =
    rawChapterArtifact.target?.videoId ?? inferVideoIdFromPath(filePath);
  const episodeNumber =
    rawChapterArtifact.target?.episodeNumber ??
    inferEpisodeNumberFromPath(filePath);

  if (parsedChapters.length === 0 && chapterText.length === 0) {
    return null;
  }

  return {
    filePath,
    target: {
      episodeNumber,
      videoId,
      videoUrl:
        rawChapterArtifact.target?.videoUrl ?? buildVideoUrl(videoId),
      title: rawChapterArtifact.target?.title,
    },
    chapterText,
    chapters: parsedChapters,
  };
}

function parseJsonSource(filePath: string): {
  normalized?: TranscriptEpisode;
  transcript?: ParsedTranscriptSource;
  chapter?: ParsedChapterArtifact;
} {
  const json = readJsonFile<unknown>(filePath);

  if (isNormalizedTranscriptEpisode(json)) {
    return {
      normalized: json,
    };
  }

  if (isRawChapterArtifact(json)) {
    const chapter = parseChapterSource(filePath, json);
    if (!chapter) {
      return {};
    }

    return {
      chapter,
    };
  }

  if (isRawTranscriptArtifact(json)) {
    const source: ParsedTranscriptSource = {
      filePath,
      videoId: json.target?.videoId ?? inferVideoIdFromPath(filePath),
      videoUrl:
        json.target?.videoUrl ??
        buildVideoUrl(json.target?.videoId ?? inferVideoIdFromPath(filePath)),
      episodeNumber: inferEpisodeNumberFromPath(filePath),
      transcriptSource: [
        json.source?.provider,
        json.source?.service,
        json.source?.model,
      ]
        .filter(Boolean)
        .join(":"),
      durationSec: json.transcript?.durationSec ?? 0,
      cues: json.transcript?.cues ?? [],
    };

    return {
      transcript: source,
    };
  }

  return {};
}

function getNormalizedTranscriptFiles(): TranscriptEpisode[] {
  return getFilePaths(normalizedTranscriptsDirectory)
    .filter((filePath) => path.extname(filePath).toLowerCase() === ".json")
    .map((filePath) => readJsonFile<unknown>(filePath))
    .filter(isNormalizedTranscriptEpisode);
}

function getDropInSources() {
  const filePaths = getFilePaths(transcriptSourcesDirectory);
  const normalized: TranscriptEpisode[] = [];
  const transcripts: ParsedTranscriptSource[] = [];
  const chapters: ParsedChapterArtifact[] = [];

  for (const filePath of filePaths) {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".json") {
      const parsed = parseJsonSource(filePath);
      if (parsed.normalized) {
        normalized.push(parsed.normalized);
      }
      if (parsed.transcript) {
        transcripts.push(parsed.transcript);
      }
      if (parsed.chapter) {
        chapters.push(parsed.chapter);
      }
      continue;
    }

    const textSource = parseTextSource(filePath);
    if (textSource) {
      transcripts.push(textSource);
    }
  }

  return {
    normalized,
    transcripts,
    chapters,
  };
}

function resolveSourceIdentity(
  source: ParsedTranscriptSource,
  chapterByVideoId: Map<string, ParsedChapterArtifact>,
  chapterByEpisodeNumber: Map<number, ParsedChapterArtifact>
) {
  const chapterArtifact =
    (source.videoId ? chapterByVideoId.get(source.videoId) : undefined) ??
    (source.episodeNumber != null
      ? chapterByEpisodeNumber.get(source.episodeNumber)
      : undefined);

  return {
    videoId: source.videoId ?? chapterArtifact?.target?.videoId,
    episodeNumber:
      source.episodeNumber ?? chapterArtifact?.target?.episodeNumber,
    videoUrl:
      source.videoUrl ??
      chapterArtifact?.target?.videoUrl ??
      buildVideoUrl(source.videoId ?? chapterArtifact?.target?.videoId),
    chapterArtifact,
  };
}

function getTranscriptGroupKey(
  source: ParsedTranscriptSource,
  chapterByVideoId: Map<string, ParsedChapterArtifact>,
  chapterByEpisodeNumber: Map<number, ParsedChapterArtifact>
) {
  const resolvedIdentity = resolveSourceIdentity(
    source,
    chapterByVideoId,
    chapterByEpisodeNumber
  );

  if (resolvedIdentity.videoId) {
    return `video:${resolvedIdentity.videoId}`;
  }

  if (resolvedIdentity.episodeNumber != null) {
    return `episode:${resolvedIdentity.episodeNumber}`;
  }

  return `file:${source.filePath}`;
}

function mergeTranscriptSources(
  transcriptSources: ParsedTranscriptSource[],
  chapterByVideoId: Map<string, ParsedChapterArtifact>,
  chapterByEpisodeNumber: Map<number, ParsedChapterArtifact>
): ParsedTranscriptSource[] {
  const groupedSources = new Map<string, ParsedTranscriptSource[]>();

  for (const source of transcriptSources) {
    const groupKey = getTranscriptGroupKey(
      source,
      chapterByVideoId,
      chapterByEpisodeNumber
    );
    const group = groupedSources.get(groupKey) ?? [];
    group.push(source);
    groupedSources.set(groupKey, group);
  }

  return Array.from(groupedSources.values()).map((sources) => {
    const sortedSources = [...sources].sort((left, right) => {
      const leftStartSec = left.cues[0]?.startSec ?? 0;
      const rightStartSec = right.cues[0]?.startSec ?? 0;
      if (leftStartSec !== rightStartSec) {
        return leftStartSec - rightStartSec;
      }

      return left.filePath.localeCompare(right.filePath, "ja-JP");
    });

    const mergedCueKeys = new Set<string>();
    const mergedCues = sortedSources
      .flatMap((source) => source.cues)
      .sort((left, right) => {
        if (left.startSec !== right.startSec) {
          return left.startSec - right.startSec;
        }
        if (left.endSec !== right.endSec) {
          return left.endSec - right.endSec;
        }
        return left.text.localeCompare(right.text, "ja-JP");
      })
      .flatMap((cue) => {
        const cueKey = `${cue.startSec}:${cue.endSec}:${cue.text}`;
        if (mergedCueKeys.has(cueKey)) {
          return [];
        }

        mergedCueKeys.add(cueKey);
        return [cue];
      })
      .map((cue, index) => ({
        ...cue,
        index: index + 1,
      }));

    const transcriptSource = Array.from(
      new Set(
        sortedSources
          .map((source) => source.transcriptSource)
          .filter((value) => value.length > 0)
      )
    ).join(", ");

    const durationSec =
      mergedCues[mergedCues.length - 1]?.endSec ??
      sortedSources[sortedSources.length - 1]?.durationSec ??
      0;

    const primarySource = sortedSources[0];
    const resolvedIdentity = resolveSourceIdentity(
      primarySource,
      chapterByVideoId,
      chapterByEpisodeNumber
    );

    return {
      filePath: primarySource.filePath,
      videoId: resolvedIdentity.videoId,
      videoUrl: resolvedIdentity.videoUrl,
      episodeNumber: resolvedIdentity.episodeNumber,
      title: sortedSources.find((source) => source.title)?.title,
      transcriptSource,
      durationSec,
      cues: mergedCues,
    };
  });
}

function normalizeDropInTranscripts(
  transcriptSources: ParsedTranscriptSource[],
  chapterArtifacts: ParsedChapterArtifact[]
): TranscriptEpisode[] {
  const chapterByVideoId = new Map<string, ParsedChapterArtifact>();
  const chapterByEpisodeNumber = new Map<number, ParsedChapterArtifact>();

  for (const chapterArtifact of chapterArtifacts) {
    const videoId = chapterArtifact.target?.videoId;
    const episodeNumber = chapterArtifact.target?.episodeNumber;
    if (videoId) {
      chapterByVideoId.set(videoId, chapterArtifact);
    }
    if (episodeNumber != null) {
      chapterByEpisodeNumber.set(episodeNumber, chapterArtifact);
    }
  }

  return mergeTranscriptSources(
    transcriptSources,
    chapterByVideoId,
    chapterByEpisodeNumber
  ).flatMap((source) => {
    const resolvedIdentity = resolveSourceIdentity(
      source,
      chapterByVideoId,
      chapterByEpisodeNumber
    );
    const chapterArtifact = resolvedIdentity.chapterArtifact;

    const videoId = resolvedIdentity.videoId;
    if (!videoId) {
      return [];
    }

    const episodeNumber = resolvedIdentity.episodeNumber;
    const chapters = chapterArtifact?.chapters ?? [];
    const title =
      chapterArtifact?.target?.title ??
      source.title ??
      buildFallbackTitle(videoId, episodeNumber);

    return [
      {
        schemaVersion: 1,
        kind: "site-youtube-transcript",
        episodeNumber,
        videoId,
        videoUrl:
          chapterArtifact?.target?.videoUrl ??
          source.videoUrl ??
          buildVideoUrl(videoId),
        title,
        thumbnailUrl: buildThumbnailUrl(videoId),
        transcriptSource:
          source.transcriptSource.length > 0
            ? source.transcriptSource
            : "file",
        durationSec: source.durationSec,
        chapterText:
          chapterArtifact?.chapterText ??
          buildChapterText(chapters),
        chapters,
        cues: source.cues,
      },
    ];
  });
}

export function getAllTranscripts(): TranscriptEpisode[] {
  const transcriptByVideoId = new Map<string, TranscriptEpisode>();
  const dropInSources = getDropInSources();

  for (const transcript of [
    ...normalizeDropInTranscripts(dropInSources.transcripts, dropInSources.chapters),
    ...dropInSources.normalized,
    ...getNormalizedTranscriptFiles(),
  ]) {
    transcriptByVideoId.set(transcript.videoId, transcript);
  }

  return Array.from(transcriptByVideoId.values()).sort((left, right) => {
    return (right.episodeNumber ?? 0) - (left.episodeNumber ?? 0);
  });
}

export function getTranscriptByVideoId(videoId: string) {
  return getAllTranscripts().find((transcript) => transcript.videoId === videoId) ?? null;
}

export function getTranscriptVideoIdSet() {
  return new Set(getAllTranscripts().map((transcript) => transcript.videoId));
}

export function getTranscriptHrefByVideoId() {
  return getAllTranscripts().reduce<Record<string, string>>((acc, transcript) => {
    acc[transcript.videoId] = `/transcripts/${transcript.videoId}`;
    return acc;
  }, {});
}

export function parseEpisodeNumberFromText(text: string) {
  const match = text.match(/#(\d{1,4})/u);
  if (!match) {
    return undefined;
  }

  return Number(match[1]);
}

export function searchTranscriptCues(
  transcripts: TranscriptEpisode[],
  query: string,
  perEpisodeLimit = 20
) {
  const normalizedQuery = normalizeSearchText(query);

  if (normalizedQuery.length === 0) {
    return [] as TranscriptSearchHit[];
  }

  return transcripts.flatMap((transcript) =>
    transcript.cues
      .filter((cue) =>
        normalizeSearchText(cue.text).includes(normalizedQuery)
      )
      .slice(0, perEpisodeLimit)
      .map<TranscriptSearchHit>((cue) => ({
        videoId: transcript.videoId,
        episodeNumber: transcript.episodeNumber,
        title: transcript.title,
        thumbnailUrl: transcript.thumbnailUrl,
        cueIndex: cue.index,
        startSec: cue.startSec,
        endSec: cue.endSec,
        text: cue.text,
      }))
  );
}

export function formatSecondsAsTimestamp(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
