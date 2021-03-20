// TODO: あとでうまいことまとめる

export type PodcastEpisode = {
  guid: string;
  title: string;
  pubDate: string;
};

export const isPodcastEpisode = (item: any): item is PodcastEpisode => {
  return (
    item.hasOwnProperty("guid") &&
    item.hasOwnProperty("title") &&
    item.hasOwnProperty("pubDate")
  );
};

export const isPodcastEpisodes = (items: any[]): items is PodcastEpisode[] => {
  return items?.every(
    (item: any) =>
      item.hasOwnProperty("guid") &&
      item.hasOwnProperty("title") &&
      item.hasOwnProperty("pubDate")
  ) ?? false;
};

export const EmptyPodcastEpisode = {
  guid: "---",
  title: "---",
  pubDate: "---",
};
