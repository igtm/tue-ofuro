`data/transcript-artifacts/` は transcript の drop-in 置き場です。

ここにファイルを置くだけで、`/transcripts` と `/transcripts/[videoId]` に反映されます。

置くファイル:

- `videoId` を含む raw `.vtt`

想定している運用:

1. `episodeNumber` か `videoId` が分かる名前で transcript ファイルを置く
2. `next build` で自動的に transcript 一覧と詳細ページが生成される

補足:

- `videoId_10_30min.vtt` のような分割 transcript も読めます
- transcript だけでも表示はできますが、タイトルは `Transcript <videoId>` のような fallback になることがあります
