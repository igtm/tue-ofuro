import {
  ComponentType,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactModal from "react-modal";
import type { TranscriptSearchHit } from "../../types";

const ModalSafeForReact18 = ReactModal as ComponentType<ReactModal["props"]>;

function normalizeSearchText(text: string): string {
  return text.trim().toLocaleLowerCase("ja-JP");
}

/** 検索キーワードをハイライト表示する */
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
        key={`${matchIndex}`}
        className="bg-orange-200 text-black px-0.5 rounded"
      >
        {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
      </mark>
    );

    cursor = matchIndex + normalizedQuery.length;
  }

  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

function formatTimestamp(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export const HeaderSearch: VFC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hits, setHits] = useState<TranscriptSearchHit[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setKeyword("");
    setHits([]);
  }, []);

  // モーダルが開いた後に入力フィールドにフォーカス
  const handleAfterOpen = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  // Cmd+K / Ctrl+K でモーダルを開く
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ルート変更時にモーダルを閉じる
  useEffect(() => {
    router.events.on("routeChangeComplete", handleClose);
    return () => {
      router.events.off("routeChangeComplete", handleClose);
    };
  }, [handleClose, router.events]);

  // デバウンス付き検索
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmed = keyword.trim();
    if (trimmed.length === 0) {
      setHits([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/transcripts/search?q=${encodeURIComponent(trimmed)}`
        );
        if (res.ok) {
          const data = (await res.json()) as { hits: TranscriptSearchHit[] };
          setHits(data.hits);
        }
      } catch {
        // エラー時は結果をクリア
        setHits([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [keyword]);

  return (
    <>
      {/* 検索トリガーボタン（ヘッダーに表示） */}
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/50 hover:border-base-content/30 hover:bg-base-200 transition-colors w-full md:w-64 cursor-pointer"
        aria-label="書き起こし検索を開く"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 shrink-0 opacity-60"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3a7.5 7.5 0 1 0 4.68 13.36l4.23 4.23 1.06-1.06-4.23-4.23A7.5 7.5 0 0 0 10.5 3ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="flex-1 text-left">Search ...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 text-xs opacity-50">
          <span className="text-[0.65rem]">⌘</span>K
        </kbd>
      </button>

      {/* 検索モーダル */}
      <ModalSafeForReact18
        isOpen={isOpen}
        onRequestClose={handleClose}
        onAfterOpen={handleAfterOpen}
        bodyOpenClassName="overflow-hidden"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "min(15vh, 120px)",
          },
          content: {
            position: "relative",
            inset: "unset",
            backgroundColor: "hsl(var(--b1))",
            color: "hsl(var(--bc))",
            border: "1px solid hsl(var(--b3))",
            borderRadius: "1rem",
            padding: 0,
            width: "100%",
            maxWidth: "560px",
            maxHeight: "70vh",
            overflow: "hidden",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* 検索入力エリア */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 shrink-0 opacity-40"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3a7.5 7.5 0 1 0 4.68 13.36l4.23 4.23 1.06-1.06-4.23-4.23A7.5 7.5 0 0 0 10.5 3ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-base-content/40"
            placeholder="書き起こしを検索 ..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <kbd
            className="text-xs border border-base-300 rounded px-1.5 py-0.5 text-base-content/40 cursor-pointer hover:bg-base-200 transition-colors"
            onClick={handleClose}
          >
            ESC
          </kbd>
        </div>

        {/* 検索結果エリア */}
        <div className="flex-1 overflow-y-auto">
          {keyword.trim().length === 0 ? (
            // 初期状態
            <div className="px-4 py-6 text-sm text-base-content/50 text-center">
              キーワードを入力して書き起こしを検索
            </div>
          ) : isSearching ? (
            // 検索中
            <div className="px-4 py-6 text-sm text-base-content/50 text-center">
              検索中 ...
            </div>
          ) : hits.length === 0 ? (
            // 検索結果なし
            <div className="px-4 py-6 text-sm text-base-content/50 text-center">
              「{keyword.trim()}」に一致する結果はありませんでした
            </div>
          ) : (
            // 検索結果一覧
            <div className="py-2">
              <div className="px-4 py-1 text-xs text-base-content/40">
                {hits.length} 件の結果
              </div>
              {hits.map((hit) => (
                <Link
                  key={`${hit.videoId}-${hit.cueIndex}`}
                  href={`/transcripts/${hit.videoId}?t=${Math.floor(hit.startSec)}&q=${encodeURIComponent(keyword.trim())}#cue-${hit.cueIndex}`}
                  className="block px-4 py-3 hover:bg-base-200 transition-colors border-b border-base-200 last:border-b-0"
                  onClick={handleClose}
                >
                  <div className="flex items-center gap-2 text-xs text-base-content/50 mb-1">
                    {hit.episodeNumber != null && (
                      <span className="badge badge-sm badge-primary text-white">
                        #{hit.episodeNumber}
                      </span>
                    )}
                    <span className="font-mono">
                      {formatTimestamp(hit.startSec)}
                    </span>
                    <span className="truncate">{hit.title}</span>
                  </div>
                  <div className="text-sm leading-relaxed line-clamp-2">
                    {highlightText(hit.text, keyword.trim())}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </ModalSafeForReact18>
    </>
  );
};
