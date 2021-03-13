const modernNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

export type ModernNumber = typeof modernNumbers[number];

export const isModernNumbers = (number: number): number is ModernNumber => {
  return modernNumbers.some((modernNumber) => {
    return modernNumber === number;
  });
};
