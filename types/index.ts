// TODO: あとでうまいことまとめる

export type PodcastEpisode = {
  guid: string;
  title: string;
  content: string;
  pubDate: string;
  enclosure: {
    url: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isPodcastEpisode = (item: any): item is PodcastEpisode => {
  return (
    Object.prototype.hasOwnProperty.call(item, "guid") &&
    Object.prototype.hasOwnProperty.call(item, "title") &&
    Object.prototype.hasOwnProperty.call(item, "content") &&
    Object.prototype.hasOwnProperty.call(item, "enclosure") &&
    Object.prototype.hasOwnProperty.call(item.enclosure, "url") &&
    Object.prototype.hasOwnProperty.call(item, "pubDate")
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TypeGuard の引数なので any 型を許容する
export const isPodcastEpisodes = (items: any[]): items is PodcastEpisode[] => {
  return (
    items?.every(
      (item) =>
        Object.prototype.hasOwnProperty.call(item, "guid") &&
        Object.prototype.hasOwnProperty.call(item, "title") &&
        Object.prototype.hasOwnProperty.call(item, "content") &&
        Object.prototype.hasOwnProperty.call(item, "enclosure") &&
        Object.prototype.hasOwnProperty.call(item.enclosure, "url") &&
        Object.prototype.hasOwnProperty.call(item, "pubDate")
    ) ?? false
  );
};

export const EmptyPodcastEpisode = {
  guid: "---",
  title: "---",
  content: "---",
  pubDate: "---",
  enclosure: {
    url: "---",
  },
};
