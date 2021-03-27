import { Button } from "../../../components/atoms/Button";
import { PageTitle } from "../../../components/atoms/PageTitle";
import { SectionTitle } from "../../../components/atoms/SectionTitle";
import { Input } from "../../../components/atoms/Input";
import { NumberCard } from "../../../components/atoms/NumberCard";
import { usePage } from "./hooks/usePage";

export default function Page() {
  const {
    numbers,
    bdayYearInputElementProps,
    bdayMonthInputElementProps,
    bdayDayInputElementProps,
    familyNameHiraganaInputElementProps,
    givenNameHiraganaInputElementProps,
    nameRomeInputElementProps,
    formElementProps,
  } = usePage();

  return (
    <>
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
                          "長音は次のように修正してください。長音の u は表記しない、長音の o は末尾にある場合のみ表記する。",
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

          <section className="grid gap-y-8">
            <SectionTitle>現代数秘術</SectionTitle>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard title="LP" number={numbers.lifePathNumber} />

              <NumberCard title="S" number={numbers.soulNumber} />

              <NumberCard title="D" number={numbers.destinyNumber} />

              <NumberCard title="P" number={numbers.personalityNumber} />

              <NumberCard title="B" number={numbers.birthdayNumber} />

              <NumberCard title="M" number={numbers.maturityNumber} />
            </div>
          </section>

          <section className="grid gap-y-8">
            <SectionTitle>カバラ</SectionTitle>

            <div className="grid grid-cols-3 gap-2">
              <NumberCard title="過去" number={numbers.pastNumber} />

              <NumberCard title="現在" number={numbers.presentNumber} />

              <NumberCard title="未来" number={numbers.futureNumber} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
