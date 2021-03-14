import {
  convertHiraganaToHiraganaAlphabet,
  HiraganaAlphabet,
  isHiragana,
} from "./typeHiraganaAlphabet";

export const convertStringToRome = (string: string) => {
  const hiraganas = Array.from(string);

  const hiraganaAlphabets: HiraganaAlphabet[] = [];

  // typeHiraganaAlphabet.ts の hiraganaAlphabets を用いた変換を行う
  for (let i = 0; i < hiraganas.length; i++) {
    const a = hiraganas[i];
    const b = hiraganas[i + 1] as string[][number] | undefined;
    const ab = a + b;

    if (b != null && isHiragana(ab)) {
      // 2文字で一音となる場合
      // 拗音（「きゃ」など）が該当する
      const hiraganaAlphabet = convertHiraganaToHiraganaAlphabet(ab);
      hiraganaAlphabets.push(hiraganaAlphabet);
      // 次の文字も含めた2文字を変換したので、次の文字単体での変換をスキップする
      i++;
    } else if (isHiragana(a)) {
      // 1文字で一音となる場合
      const hiraganaAlphabet = convertHiraganaToHiraganaAlphabet(a);
      hiraganaAlphabets.push(hiraganaAlphabet);
    } else {
      // isHiragana でない場合は無視
      // hiraganaAlphabets には push しない
    }
  }

  const alphabets: string[] = [];

  // 撥音（「ん」）、撥音（「っ」）、長音（「う」「お」）の変化
  for (let i = 0; i < hiraganaAlphabets.length; i++) {
    const z = hiraganaAlphabets[i - 1] as
      | HiraganaAlphabet[][number]
      | undefined;
    const a = hiraganaAlphabets[i];
    const b = hiraganaAlphabets[i + 1] as
      | HiraganaAlphabet[][number]
      | undefined;

    if (a === "n") {
      // 撥音（「ん」）の場合
      if (
        b != null &&
        (b.startsWith("b") || b.startsWith("m") || b.startsWith("p"))
      ) {
        // b, m, p が続く場合は "m"
        alphabets.push("m");
      } else {
        // b, m, p 以外が続く場合は "n"
        alphabets.push("n");
      }
    } else if (a === "xtsu") {
      // 撥音（「っ」）の場合
      if (b != null) {
        // 撥音（「っ」）に続く文字がある場合
        if (b.startsWith("ch")) {
          // ch が続く場合は "t"
          alphabets.push("t");
        } else {
          // ch 以外が続く場合は続く文字を重ねる
          alphabets.push(b.substring(0, 1));
        }
      } else {
        // 撥音（「っ」）に続く文字がない場合は無視する
      }
    } else if (z != null && (z.endsWith("u") || z.endsWith("o")) && a === "u") {
      // 長音の u は常に省略する
    } else if (z != null && z.endsWith("o") && a === "o") {
      // 長音の o の場合
      if (b === undefined) {
        // 長音の o が末尾にある場合は省略しない
        alphabets.push(a);
      } else {
        // 長音の o が末尾以外にある場合は省略する
      }
    } else {
      // 撥音、撥音、長音以外の場合は変化なし
      alphabets.push(a);
    }
  }

  return alphabets.join("");
};
