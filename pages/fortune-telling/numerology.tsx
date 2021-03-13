import { Button } from "../../components/atoms/Button";
import { H1 } from "../../components/atoms/H1";
import { H2 } from "../../components/atoms/H2";
import { Input } from "../../components/atoms/Input";
import { NumberCard } from "../../components/atoms/NumberCard";

export default function Page() {
  return (
    <>
      <main className="grid gap-y-12">
        <H1>数秘術</H1>

        <div className="grid gap-y-16">
          <section className="grid gap-y-8">
            <H2>生年月日、氏名を入力</H2>

            <form>
              <div className="grid gap-y-8">
                <div className="grid grid-flow-col grid-cols-3 gap-x-2 gap-y-4">
                  <div className="row-start-1">
                    <Input
                      labelString="誕生年"
                      type="text"
                      name="bday-year"
                      id="bday-year"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-year"
                    />
                  </div>

                  <div className="row-start-1">
                    <Input
                      labelString="誕生月"
                      type="text"
                      id="bday-month"
                      name="bday-month"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-month"
                    />
                  </div>

                  <div className="row-start-1">
                    <Input
                      labelString="誕生日"
                      type="text"
                      id="bday-day"
                      name="bday-day"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-day"
                    />
                  </div>

                  <div className="row-start-2 col-start-1 col-end-4">
                    <Input
                      labelString="氏名（ひらがな）"
                      type="text"
                      id="name"
                      name="name"
                      pattern="[ぁ-ん]*"
                    />
                  </div>
                </div>

                <div>
                  <Button>数秘を求める</Button>
                </div>
              </div>
            </form>
          </section>

          <section className="grid gap-y-8">
            <H2>現代数秘術</H2>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard title="LP" number={1} />

              <NumberCard title="S" number={2} />

              <NumberCard title="D" number={3} />

              <NumberCard title="P" number={11} />

              <NumberCard title="B" number={33} />

              <NumberCard title="M" number={undefined} />
            </div>
          </section>

          <section className="grid gap-y-8">
            <H2>カバラ</H2>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard title="過去" number={1} />

              <NumberCard title="現在" number={2} />

              <NumberCard title="未来" number={22} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
