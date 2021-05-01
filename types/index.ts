// TODO: あとでうまいことまとめる

export type YouTubeEpisode = {
  videoId: string;
  isLive: boolean;
  title: string;
  description: string;
  thumbnailUrl: string;
  pubDate: string;
};

export type PodcastEpisode = {
  guid: string;
  title: string;
  content: string;
  pubDate: string;
  enclosure: {
    url: string;
  };
  itunes: {
    summary: string;
    explicit: string;
    image: string;
    episode: string;
    season: string;
    duration: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isYouTubeEpisode = (item: any): item is YouTubeEpisode => {
  return (
    Object.prototype.hasOwnProperty.call(item, "videoId") &&
    typeof item.videoId === "string"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isYouTubeEpisodes = (items: any[]): items is YouTubeEpisode[] => {
  return items?.every((item) => isYouTubeEpisode(item)) ?? false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isPodcastEpisode = (item: any): item is PodcastEpisode => {
  return (
    Object.prototype.hasOwnProperty.call(item, "guid") &&
    typeof item.guid === "string"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isPodcastEpisodes = (items: any[]): items is PodcastEpisode[] => {
  return items?.every((item) => isPodcastEpisode(item)) ?? false;
};

export const EmptyPodcastEpisode: PodcastEpisode = {
  guid: "---",
  title: "---",
  content: "---",
  pubDate: "---",
  enclosure: {
    url: "---",
  },
  itunes: {
    summary: "---",
    explicit: "---",
    image: "---",
    episode: "---",
    season: "---",
    duration: "---",
  },
};
