import { NextPage } from "next";
import Head from "next/head";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { PageTitle } from "../../../components/atoms/PageTitle";
import { SectionTitle } from "../../../components/atoms/SectionTitle";
import { NumberCard } from "./components/NumberCard";
import { getNumberDescription } from "./functions/getNumberDescription";
import { getNumberTypeDescription } from "./functions/getNumberTypeDescription";
import { usePage } from "./hooks/usePage";

const Page: NextPage = () => {
  const {
    numbers,
    bdayYearInputElementProps,
    bdayMonthInputElementProps,
    bdayDayInputElementProps,
    familyNameHiraganaInputElementProps,
    givenNameHiraganaInputElementProps,
    nameRomeInputElementProps,
    formElementProps,
    scrollTargetRef,
  } = usePage();

  return (
    <>
      <Head>
        <title>数秘術 | 占い | 火曜日のおフロ</title>
      </Head>

      <main className="grid gap-y-12">
        <PageTitle>数秘術</PageTitle>

        <div className="grid gap-y-16">
          <section className="grid gap-y-8">
            <SectionTitle>生年月日、氏名を入力</SectionTitle>

            <form onSubmit={formElementProps.onSubmit} noValidate={true}>
              <div className="grid gap-y-8">
                <div className="grid grid-flow-col grid-cols-6 gap-x-2 gap-y-4">
                  <div className="row-start-1 col-start-1 col-end-3">
                    <Input
                      labelString="誕生年"
                      type="text"
                      name="bday-year"
                      id="bday-year"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-year"
                      value={bdayYearInputElementProps.value}
                      description={{
                        id: "bday-year-description",
                        errors: bdayYearInputElementProps.errors,
                      }}
                      touched={bdayYearInputElementProps.touched}
                      onChange={bdayYearInputElementProps.onChange}
                      onBlur={bdayYearInputElementProps.onBlur}
                    />
                  </div>

                  <div className="row-start-1 col-start-3 col-end-5">
                    <Input
                      labelString="誕生月"
                      type="text"
                      id="bday-month"
                      name="bday-month"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-month"
                      value={bdayMonthInputElementProps.value}
                      description={{
                        id: "bday-month-description",
                        errors: bdayMonthInputElementProps.errors,
                      }}
                      touched={bdayMonthInputElementProps.touched}
                      onChange={bdayMonthInputElementProps.onChange}
                      onBlur={bdayMonthInputElementProps.onBlur}
                    />
                  </div>

                  <div className="row-start-1 col-start-5 col-end-7">
                    <Input
                      labelString="誕生日"
                      type="text"
                      id="bday-day"
                      name="bday-day"
                      inputMode="numeric"
                      pattern="\d*"
                      autoComplete="bday-day"
                      value={bdayDayInputElementProps.value}
                      description={{
                        id: "bday-day-description",
                        errors: bdayDayInputElementProps.errors,
                      }}
                      touched={bdayDayInputElementProps.touched}
                      onChange={bdayDayInputElementProps.onChange}
                      onBlur={bdayDayInputElementProps.onBlur}
                    />
                  </div>

                  <div className="row-start-2 col-start-1 col-end-4">
                    <Input
                      labelString="苗字（ひらがな）"
                      type="text"
                      id="family-name-hiragana"
                      name="family-name-hiragana"
                      pattern="[ぁ-ん]*"
                      value={familyNameHiraganaInputElementProps.value}
                      description={{
                        id: "family-name-hiragana-description",
                        errors: familyNameHiraganaInputElementProps.errors,
                      }}
                      touched={familyNameHiraganaInputElementProps.touched}
                      onChange={familyNameHiraganaInputElementProps.onChange}
                      onBlur={familyNameHiraganaInputElementProps.onBlur}
                    />
                  </div>

                  <div className="row-start-2 col-start-4 col-end-7">
                    <Input
                      labelString="名前（ひらがな）"
                      type="text"
                      id="given-name-hiragana"
                      name="given-name-hiragana"
                      pattern="[ぁ-ん]*"
                      value={givenNameHiraganaInputElementProps.value}
                      description={{
                        id: "given-name-hiragana-description",
                        errors: givenNameHiraganaInputElementProps.errors,
                      }}
                      touched={givenNameHiraganaInputElementProps.touched}
                      onChange={givenNameHiraganaInputElementProps.onChange}
                      onBlur={givenNameHiraganaInputElementProps.onBlur}
                    />
                  </div>

                  <div className="row-start-3 col-start-1 col-end-7">
                    <Input
                      labelString="氏名（ローマ字）"
                      type="text"
                      id="name-rome"
                      name="name-rome"
                      pattern="[a-z]*"
                      value={nameRomeInputElementProps.value}
                      description={{
                        id: "name-rome-description",
                        note:
                          "ここに表示されるローマ字表記が気になる場合は修正してください。",
                        errors: nameRomeInputElementProps.errors,
                      }}
                      touched={nameRomeInputElementProps.touched}
                      onChange={nameRomeInputElementProps.onChange}
                      onBlur={nameRomeInputElementProps.onBlur}
                    />
                  </div>
                </div>

                <div>
                  <Button>数秘を求める</Button>
                </div>
              </div>
            </form>
          </section>

          <section className="grid gap-y-8" ref={scrollTargetRef}>
            <SectionTitle>現代数秘術</SectionTitle>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard
                numberType="LP"
                numberTypeDescription={getNumberTypeDescription("LP")}
                number={numbers.lifePathNumber}
                numberDescription={getNumberDescription(numbers.lifePathNumber)}
              />

              <NumberCard
                numberType="S"
                numberTypeDescription={getNumberTypeDescription("S")}
                number={numbers.soulNumber}
                numberDescription={getNumberDescription(numbers.soulNumber)}
              />

              <NumberCard
                numberType="D"
                numberTypeDescription={getNumberTypeDescription("D")}
                number={numbers.destinyNumber}
                numberDescription={getNumberDescription(numbers.destinyNumber)}
              />

              <NumberCard
                numberType="P"
                numberTypeDescription={getNumberTypeDescription("P")}
                number={numbers.personalityNumber}
                numberDescription={getNumberDescription(
                  numbers.personalityNumber
                )}
              />

              <NumberCard
                numberType="B"
                numberTypeDescription={getNumberTypeDescription("B")}
                number={numbers.birthdayNumber}
                numberDescription={getNumberDescription(numbers.birthdayNumber)}
              />

              <NumberCard
                numberType="M"
                numberTypeDescription={getNumberTypeDescription("M")}
                number={numbers.maturityNumber}
                numberDescription={getNumberDescription(numbers.maturityNumber)}
              />
            </div>
          </section>

          <section className="grid gap-y-8">
            <SectionTitle>カバラ</SectionTitle>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard
                numberType="過去"
                numberTypeDescription={getNumberTypeDescription("過去")}
                number={numbers.pastNumber}
                numberDescription={getNumberDescription(numbers.pastNumber)}
              />

              <NumberCard
                numberType="現在"
                numberTypeDescription={getNumberTypeDescription("現在")}
                number={numbers.presentNumber}
                numberDescription={getNumberDescription(numbers.presentNumber)}
              />

              <NumberCard
                numberType="未来"
                numberTypeDescription={getNumberTypeDescription("未来")}
                number={numbers.futureNumber}
                numberDescription={getNumberDescription(numbers.futureNumber)}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;
