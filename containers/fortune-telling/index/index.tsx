import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { PageTitle } from "../../../components/atoms/PageTitle";
import { Card } from "./components/Card";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>占い | 火曜日のおフロ</title>
      </Head>

      <main className="grid gap-y-12">
        <PageTitle>占い</PageTitle>

        <ul className="grid grid-cols-3 gap-2 px-2">
          <li>
            <Link href="/fortune-telling/numerology">
              <Card>数秘術</Card>
            </Link>
          </li>

          <li>
            <Link href="/fortune-telling/geomancy">
              <Card>ジオマンシー</Card>
            </Link>
          </li>

          <li>
            <Card>Coming Soon</Card>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Page;
