import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTranscripts, searchTranscriptCues } from "../../../lib/transcripts";
import type { TranscriptSearchHit } from "../../../types";

type ResponseData = {
  hits: TranscriptSearchHit[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (query.length === 0) {
    return res.status(200).json({ hits: [] });
  }

  const transcripts = getAllTranscripts();
  const hits = searchTranscriptCues(transcripts, query, 5);

  // 上位20件に制限
  return res.status(200).json({ hits: hits.slice(0, 20) });
}
