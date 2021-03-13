const alphabetNumbers = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8,
} as const;

export type Alphabet = keyof typeof alphabetNumbers;

export type AlphabetNumber = typeof alphabetNumbers[Alphabet];

export const isAlphabet = (string: string): string is Alphabet => {
  return string in alphabetNumbers;
};

export const isAlphabetNumber = (number: number): number is AlphabetNumber => {
  return Object.values(alphabetNumbers).some((alphabetNumber) => {
    return alphabetNumber === number;
  });
};

export const convertAlphabetToNumber = (alphabet: Alphabet): AlphabetNumber => {
  return alphabetNumbers[alphabet];
};
