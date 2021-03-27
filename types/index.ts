// TODO: あとでうまいことまとめる

export type PodcastEpisode = {
  guid: string;
  title: string;
  content: string;
  pubDate: string;
  enclosure: {
    url: string;
  }
};

export const isPodcastEpisode = (item: any): item is PodcastEpisode => {
  return (
    item.hasOwnProperty("guid") &&
    item.hasOwnProperty("title") &&
    item.hasOwnProperty("content") &&
    item.hasOwnProperty("enclosure") &&
    item.enclosure.hasOwnProperty("url") &&
    item.hasOwnProperty("pubDate")
  );
};

export const isPodcastEpisodes = (items: any[]): items is PodcastEpisode[] => {
  return items?.every(
    (item: any) =>
      item.hasOwnProperty("guid") &&
      item.hasOwnProperty("title") &&
      item.hasOwnProperty("content") &&
    item.hasOwnProperty("enclosure") &&
    item.enclosure.hasOwnProperty("url") &&
    item.hasOwnProperty("pubDate")
  ) ?? false;
};

export const EmptyPodcastEpisode = {
  guid: "---",
  title: "---",
  content: "---",
  pubDate: "---",
  enclosure: {
    url: "---"
  },
};
