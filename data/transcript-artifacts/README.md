`data/transcript-artifacts/` は transcript の drop-in 置き場です。

ここにファイルを置くだけで、`/transcripts` と `/transcripts/[videoId]` に反映されます。

優先して置くファイル:

- `youtube-transcribe` の `*.combined.json`
- `videoId` を含む `.srt` / `.vtt`
- `videoId_65_75min.txt` のような chunk 単位 transcript
- manual chapter の `*-manual-chapters.json`

補助的に読めるファイル:

- `.srt`
- `.vtt`
- `.txt`

想定している運用:

1. `episodeNumber` か `videoId` が分かる名前で transcript ファイルを置く
2. 可能なら同じ episode の `*-manual-chapters.json` も置く
3. `next build` で自動的に transcript 一覧と詳細ページが生成される

補足:

- legacy な manual chapter JSON も読めます
- `videoId_10_30min.srt` や `videoId_65_75min.txt` のような分割 transcript も読めます
- `txt` は `[0.00s -> 4.00s] こんにちは` 形式の行を cue として読めます
- `manual-chapters.json` があると chapter ボタンと chapter タイトルがきれいに出ます
- transcript だけでも表示はできますが、タイトルは `Episode #165 transcript` のような fallback になることがあります
