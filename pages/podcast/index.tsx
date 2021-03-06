import Link from "next/link";
import { NextPage } from "next";
import { PodcastEpisode } from "../../types";

type Props = {
  episodes: PodcastEpisode[];
};

const Page: NextPage<Props> = ({ episodes }) => {
  return (
    <div>
      <ul>
        {episodes.map((e) => (
          <li key={e.guid} className="p-4">
            <div className="text-gray-500">
              {new Date(Date.parse(e.pubDate)).toLocaleDateString()}
            </div>
            <Link href={`/podcast/${e.guid}`}>
              <a>{e.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

export async function getStaticProps() {
  const res = await fetch(`${process.env.WEBAPP_URL}/api/podcast`);
  const data = await res.json();

  return {
    props: {
      episodes: data.items,
    },
  };
}
