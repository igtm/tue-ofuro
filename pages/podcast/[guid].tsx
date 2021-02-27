import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { PodcastEpisode } from "../../types";

type Props = { episode: PodcastEpisode };

const getAllEpisodeIds = async (): Promise<string[]> => {
  const res = await fetch(`${process.env.WEBAPP_URL}/api/podcast`);
  return (await res.json()).items.map(
    (episode: PodcastEpisode) => episode.guid
  );
};

// revalidate する
export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const guid = ctx.params?.guid;
  const res = await fetch(`${process.env.WEBAPP_URL}/api/podcast/${guid}`);
  const data = await res.json();

  return {
    props: {
      episode: data,
    },
  };
};

export const getStaticPaths = async () => {
  const guids = await getAllEpisodeIds();

  return {
    paths: guids.map((guid) => ({ params: { guid } })),
    fallback: false,
  };
};

const Page: NextPage<Props> = ({ episode }) => {
  return (
    <div>
      <div>{episode.pubDate}</div>
      <div>{episode.title}</div>
    </div>
  );
};

export default Page;
