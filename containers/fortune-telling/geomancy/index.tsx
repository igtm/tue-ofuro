import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Button } from "../../../components/atoms/Button";
import { PageTitle } from "../../../components/atoms/PageTitle";
import { Paragraph } from "../../../components/atoms/Paragraph";
import { GeomancyButton } from "./components/GeomancyButton";
import { GeomancyCard } from "./components/GeomancyCard";
import { usePage } from "./hooks/usePage";

const Page: NextPage = () => {
  const {
    counter1,
    counter2,
    counter3,
    counter4,
    disabled,
    onSubmit,
    geomancySymbol,
    scrollTargetRef,
  } = usePage();

  return (
    <>
      <Head>
        <title>ジオマンシー | 占い | 火曜日のおフロ</title>
      </Head>

      <main className="grid gap-y-20">
        <div className="grid gap-y-12">
          <PageTitle>ジオマンシー</PageTitle>

          <div className="grid gap-y-2">
            <Paragraph>
              質問を決め、4つのボタンを順番に、無心で好きなだけタップしてください。このとき、タップした回数を数えないようにするのがポイントです。
            </Paragraph>

            <Paragraph>
              そののち、「シンボルを表示する」をタップしてください。
            </Paragraph>
          </div>

          <form onSubmit={onSubmit} noValidate={true}>
            <div className="grid gap-y-14">
              <div className="grid gap-y-6">
                <div>
                  <GeomancyButton
                    type="button"
                    onClick={counter1.onClickCounter}
                    disabled={disabled.counter1}
                  >
                    ボタン 1
                  </GeomancyButton>
                </div>

                <div>
                  <GeomancyButton
                    type="button"
                    onClick={counter2.onClickCounter}
                    disabled={disabled.counter2}
                  >
                    ボタン 2
                  </GeomancyButton>
                </div>

                <div>
                  <GeomancyButton
                    type="button"
                    onClick={counter3.onClickCounter}
                    disabled={disabled.counter3}
                  >
                    ボタン 3
                  </GeomancyButton>
                </div>

                <div>
                  <GeomancyButton
                    type="button"
                    onClick={counter4.onClickCounter}
                    disabled={disabled.counter4}
                  >
                    ボタン 4
                  </GeomancyButton>
                </div>
              </div>

              <div>
                <Button disabled={disabled.submit}>シンボルを表示する</Button>
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-flow-col grid-cols-4" ref={scrollTargetRef}>
          <div className="col-start-2 col-end-4">
            <GeomancyCard
              geomancySymbol={geomancySymbol}
              geomancySymbolDescription={undefined}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
