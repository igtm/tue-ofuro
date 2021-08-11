import { NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import { getAllPostSlugs } from '../../lib/api';

type Props = {
  slugs: string[][];
};

const Page: NextPage<Props> = ({ slugs }) => {
  return (
    <>
      <ul className="grid gap-y-8">
        {slugs.map((s) => {
          const detailPagePath = path.join(...s);
          return (
            <li key={detailPagePath}>
              <Link href={'/blog/' + detailPagePath}>{detailPagePath}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Page;

export const getStaticProps = async () => {
  // TODO: postをとってきてtitleにする
  const slugs = getAllPostSlugs();
  return {
    props: {
      slugs: slugs,
    },
    revalidate: 3600,
  };
};
