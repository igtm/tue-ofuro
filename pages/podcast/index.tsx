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
          <li>
            <Link href={`/podcast/${e.guid}`}>
              <a>
                {e.title} {e.pubDate}
              </a>
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
