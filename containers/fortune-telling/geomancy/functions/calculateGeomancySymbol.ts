export const calculateGeomancySymbol = (
  count1: number,
  count2: number,
  count3: number,
  count4: number
) => {
  const column1 = count1 % 2;
  const column2 = count2 % 2;
  const column3 = count3 % 2;
  const column4 = count4 % 2;

  if (column1 === 0 && column2 === 0 && column3 === 0 && column4 === 0) {
    return "人々";
  }
  if (column1 === 1 && column2 === 1 && column3 === 1 && column4 === 1) {
    return "道";
  }
  if (column1 === 0 && column2 === 1 && column3 === 1 && column4 === 0) {
    return "つながり";
  }
  if (column1 === 1 && column2 === 0 && column3 === 0 && column4 === 1) {
    return "拘束";
  }
  if (column1 === 0 && column2 === 0 && column3 === 1 && column4 === 1) {
    return "大吉";
  }
  if (column1 === 1 && column2 === 1 && column3 === 0 && column4 === 0) {
    return "小吉";
  }
  if (column1 === 0 && column2 === 1 && column3 === 0 && column4 === 1) {
    return "獲得";
  }
  if (column1 === 1 && column2 === 0 && column3 === 1 && column4 === 0) {
    return "喪失";
  }
  if (column1 === 1 && column2 === 0 && column3 === 0 && column4 === 0) {
    return "喜び";
  }
  if (column1 === 0 && column2 === 0 && column3 === 0 && column4 === 1) {
    return "悲しみ";
  }
  if (column1 === 1 && column2 === 0 && column3 === 1 && column4 === 1) {
    return "少女";
  }
  if (column1 === 1 && column2 === 1 && column3 === 0 && column4 === 1) {
    return "少年";
  }
  if (column1 === 0 && column2 === 0 && column3 === 1 && column4 === 0) {
    return "白";
  }
  if (column1 === 0 && column2 === 1 && column3 === 0 && column4 === 0) {
    return "赤";
  }
  if (column1 === 0 && column2 === 1 && column3 === 1 && column4 === 1) {
    return "竜の頭";
  }
  if (column1 === 1 && column2 === 1 && column3 === 1 && column4 === 0) {
    return "竜の尾";
  }
  throw new Error("calculateSymbols に失敗しました");
};
