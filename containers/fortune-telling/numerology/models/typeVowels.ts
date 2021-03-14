const vowels = ["a", "i", "u", "e", "o"] as const;

export type Vowel = typeof vowels[number];

export const isVowel = (string: string): string is Vowel => {
  return vowels.some((vowel) => {
    return vowel === string;
  });
};
