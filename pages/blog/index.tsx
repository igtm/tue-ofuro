import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import { PageTitle } from '../../components/atoms/PageTitle';
import { BlogListItem } from '../../components/molecules/BlogListItem';
import { getAllPosts } from '../../lib/api';
import { Post } from '../../types';

type Props = {
  posts: Pick<Post, "slug" | "dateTime" | "title">[];
};

const Page: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>ブログ | 火曜日のおフロ</title>
      </Head>

      <main className="grid gap-y-12">
        <PageTitle>ブログ</PageTitle>

        <ul className="grid gap-y-6">
          {posts.map((post) => {
            const detailPagePath = path.join(...post.slug);
            return (
              <BlogListItem
                key={detailPagePath}
                href={'/blog/' + detailPagePath}
                title={post.title}
                dateTime={post.dateTime}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();

  // Next.js の getStaticProps が返す props に渡せない値を変換する
  const propsPosts = posts.map((post) => {
    // undefined は渡せないので delete する
    if (post.dateTime === undefined) {
      delete post.dateTime;
    }

    return {
      ...post,
    };
  });

  return {
    props: {
      posts: propsPosts,
    },
    revalidate: 3600,
  };
};
