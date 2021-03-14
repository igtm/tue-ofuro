const cabalaNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22] as const;

export type CabalaNumber = typeof cabalaNumbers[number];

export const isCabalaNumber = (number: number): number is CabalaNumber => {
  return cabalaNumbers.some((cabalaNumber) => {
    return cabalaNumber === number;
  });
};
