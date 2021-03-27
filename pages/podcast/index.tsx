import Link from "next/link";
import { MouseEvent, useEffect } from "react";
import { FC, useRef } from "react";
import { GetStaticProps, NextPage } from "next";
import { isPodcastEpisodes, PodcastEpisode } from "../../types";
import Parser from "rss-parser";

type Props = {
  episodes: PodcastEpisode[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  return (
    <div>
      <ul>
        {episodes.map((e) => (
          <PodcastEpisodeListItem key={e.guid} episode={e} />
        ))}
      </ul>
    </div>
  );
};

// TODO: あとでコンポーネントにする
type ListItemProps = {
  key: string;
  episode: PodcastEpisode;
};

// TODO: imgなおす
const PodcastEpisodeListItem: FC<ListItemProps> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    audioRef.current?.addEventListener("loadedmetadata", function (e) {
      var time = audioRef.current?.currentTime;
      requestAnimationFrame(function me() {
        if (time !== audioRef.current?.currentTime) {
          time = audioRef.current?.currentTime;
          audioRef.current?.dispatchEvent(new CustomEvent("timeupdate"));
        }
        requestAnimationFrame(me);
      });
    });
    audioRef.current?.addEventListener("timeupdate", (e) => {
      const audio = audioRef.current;
      const seekBar = seekBarRef.current;
      const currentTimeSpan = currentTimeRef.current;
      const durationSpan = durationRef.current;
      if (audio === null || seekBar === null) {
        return;
      }
      const duration = Math.round(audio.duration);
      if (isNaN(duration)) {
        return;
      }
      if (currentTimeSpan !== null && durationSpan !== null) {
        currentTimeSpan.innerHTML = playTime(Math.floor(audio.currentTime));
        durationSpan.innerHTML = playTime(duration);
      }
      const percent =
        Math.round((audio.currentTime / audio.duration) * 1000) / 10;
      seekBar.style.backgroundSize = percent + "%";
    });
  }, []);

  const seekBarStyle = {
    height: "10px",
    borderRadius: "5px",
    background: "linear-gradient(#ccc, #ccc) no-repeat #eee",
  };
  const handleClickSeekBar = (e: MouseEvent) => {
    const audio = audioRef.current;
    if (audio === null) {
      return;
    }
    const duration = Math.round(audio.duration);
    if (!isNaN(duration)) {
      const mouse = e.clientX;
      const rect = e.currentTarget.getBoundingClientRect();
      const position = rect.left + window.pageXOffset;
      const offset = mouse - position;
      const width = rect.right - rect.left;
      audio.currentTime = Math.round(duration * (offset / width));
    }
  };

  return (
    <li className="p-4">
      <div className="flex flex-row">
        <img
          width="161px"
          height="161px"
          src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded400/7154731/7154731-1595051210700-79e42afb99639.jpg"
        />
        <div>
          <Link href={`/podcast/${props.episode.guid}`}>
            <a>{props.episode.title}</a>
          </Link>
          <div className="text-gray-500">
            {new Date(Date.parse(props.episode.pubDate)).toLocaleDateString()}
          </div>
          <audio ref={audioRef} src={props.episode.enclosure.url}></audio>
          <div className="w-80 m-4 flex flex-col">
            <div className="flex flex-row justify-between">
              <span ref={currentTimeRef}>00:00</span>
              <span ref={durationRef}>00:00</span>
            </div>
            <div
              ref={seekBarRef}
              style={seekBarStyle}
              onClick={(e) => handleClickSeekBar(e)}
            ></div>
          </div>
          <button
            onClick={() => {
              audioRef.current?.play();
            }}
          >
            play
          </button>
          <button
            onClick={() => {
              audioRef.current?.pause();
            }}
          >
            pause
          </button>
        </div>
      </div>
    </li>
  );
};

function playTime(t: number) {
  let hms = "";
  const h = (t / 3600) | 0;
  const m = ((t % 3600) / 60) | 0;
  const s = t % 60;
  const z2 = (v: number) => {
    const s = "00" + v;
    return s.substr(s.length - 2, 2);
  };
  if (h != 0) {
    hms = h + ":" + z2(m) + ":" + z2(s);
  } else if (m != 0) {
    hms = z2(m) + ":" + z2(s);
  } else {
    hms = "00:" + z2(s);
  }
  return hms;
}

export default Page;

const parser: Parser = new Parser();

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    // const res = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCEpBWGBKeawXcNupDevCmSg&key=${process.env.YOUTUBE_API_KEY}`
    // );
    // const data = await res.json();
    // console.log(data.items);
    // console.log(data.items[0].id);
    // console.log(data.items[0].id.videoId);
    // console.log(data.items[0].snippet);
    const feed = await parser.parseURL(
      "https://anchor.fm/s/2b3dd74c/podcast/rss"
    );
    if (isPodcastEpisodes(feed.items)) {
      return {
        props: {
          episodes: feed.items as PodcastEpisode[],
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      episodes: [],
    },
  };
};
