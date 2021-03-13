import {
  AlphabetNumber,
  convertAlphabetToNumber,
  isAlphabet,
} from "./typeAlphabetNumber";

export const convertAlphabetStringToNumberString = (alphabetString: string) => {
  const alphabets = Array.from(alphabetString);

  const numbers: AlphabetNumber[] = [];

  // typeHiraganaAlphabet.ts の hiraganaAlphabets を用いた変換を行う
  for (let i = 0; i < alphabets.length; i++) {
    const alphabet = alphabets[i];

    if (isAlphabet(alphabet)) {
      const alphabetNumber = convertAlphabetToNumber(alphabet);
      numbers.push(alphabetNumber);
    } else {
      // isAlphabet でない場合は無視
      // numbers には push しない
    }
  }

  return numbers.join("");
};
