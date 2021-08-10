import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { DangerousHTML } from "../../components/atoms/DangerousHTML";
import { Fallback } from "../../components/organisms/Fallback";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  post?: {
    slug: string;
    title: string;
    content: string;
  };
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props> = async (
  ctx: GetStaticPropsContext<Params>
) => {
  if (ctx.params?.slug === undefined) {
    return {
      props: {},
    };
  }

  const post = getPostBySlug(ctx.params.slug, ["slug", "title", "content"]);
  const content = await markdownToHtml(post.content ?? "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

const Page: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Fallback />;
  }

  if (post === undefined) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <article>
      <Head>
        <title>{post.title}</title>
      </Head>

      <DangerousHTML content={post.content} />
    </article>
  );
};

export default Page;
