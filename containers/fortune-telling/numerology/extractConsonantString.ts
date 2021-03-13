import { isVowel } from "./typeVowels";

export const extractConsonantString = (string: string): string => {
  const strings = Array.from(string);

  const consonants: string[] = [];

  for (const string of strings) {
    if (!isVowel(string)) {
      consonants.push(string);
    }
  }

  return consonants.join("");
};
