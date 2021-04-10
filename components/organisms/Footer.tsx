import { VFC } from "react";

export const Footer: VFC = () => {
  return (
    <footer className="text-center pt-4 pb-4 bg-gray-100">
      <ul className="flex items-center justify-center gap-2">
        <li>
          <a
            href="https://anchor.fm/tue-ofuro"
            target="_blank"
            rel="noreferrer"
          >
            Anchor
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCEpBWGBKeawXcNupDevCmSg"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/tue_ofuro"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </li>
      </ul>
      <small>©火曜日のおフロ</small>
    </footer>
  );
};
