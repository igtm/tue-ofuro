// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { guid },
  } = req;

  const parser: Parser = new Parser();

  try {
    (async () => {
      const feed = await parser.parseURL(
        "https://anchor.fm/s/2b3dd74c/podcast/rss"
      );
      res.statusCode = 200;
      res.json({ ...feed.items.find((f) => f.guid === guid) });
    })();
  } catch (e) {
    if (e instanceof Error) {
      res.statusCode = 500;
      res.json({ message: e.message });
      return;
    }
    res.statusCode = 500;
    res.json({ message: "unexpected error" });
  }
};
