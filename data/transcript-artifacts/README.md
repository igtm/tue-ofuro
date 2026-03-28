`data/transcript-artifacts/` は transcript の drop-in 置き場です。

ここにファイルを置くだけで、`/transcripts` と `/transcripts/[videoId]` に反映されます。

優先して置くファイル:

- `videoId` を含む raw `.vtt`
- `videoId_65_75min.txt` のような chunk 単位 transcript

補助的に読めるファイル:

- `.srt`
- `.vtt`
- `.txt`

想定している運用:

1. `episodeNumber` か `videoId` が分かる名前で transcript ファイルを置く
2. `next build` で自動的に transcript 一覧と詳細ページが生成される

補足:

- `videoId_10_30min.srt` や `videoId_65_75min.txt` のような分割 transcript も読めます
- `txt` は `[0.00s -> 4.00s] こんにちは` 形式の行を cue として読めます
- transcript だけでも表示はできますが、タイトルは `Episode #165 transcript` のような fallback になることがあります
