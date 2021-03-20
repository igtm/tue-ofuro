import { isVowel, Vowel } from "../models/typeVowels";

export const extractVowelString = (string: string): string => {
  const strings = Array.from(string);

  const vowels: Vowel[] = [];

  for (const string of strings) {
    if (isVowel(string)) {
      vowels.push(string);
    }
  }

  return vowels.join("");
};
