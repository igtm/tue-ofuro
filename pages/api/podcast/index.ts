// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const parser: Parser = new Parser();

  try {
    (async () => {
      const feed = await parser.parseURL(
        "https://anchor.fm/s/2b3dd74c/podcast/rss"
      );
      res.statusCode = 200;
      res.json({ title: feed.title, items: feed.items.map((f) => ({ ...f })) });
    })();
  } catch (e) {
    res.statusCode = 500;
    res.json({ message: e.message });
  }
};
