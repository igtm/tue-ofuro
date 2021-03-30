const geomancySymbols = [
  "人々",
  "道",
  "つながり",
  "拘束",
  "大吉",
  "小吉",
  "獲得",
  "喪失",
  "喜び",
  "悲しみ",
  "少女",
  "少年",
  "白",
  "赤",
  "竜の頭",
  "竜の尾",
] as const;

export type GeomancySymbol = typeof geomancySymbols[number];

export const isGeomancySymbol = (string: string): string is GeomancySymbol => {
  return geomancySymbols.some((geomancySymbol) => {
    return geomancySymbol === string;
  });
};
