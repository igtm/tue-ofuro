export const getNumberTypeDescription = (numberType: string) => {
  switch (numberType) {
    case "LP":
      return "ライフ・パス・ナンバー。持って生まれた資質や才能、性格を表す数字。";
    case "S":
      return "ソウル・ナンバー。心の奥深くの無意識が求めていることを表す数字。";
    case "D":
      return "ディスティニー・ナンバー。社会に対する役割や、後天的な能力を表す数字。";
    case "P":
      return "パーソナリティー・ナンバー。他人にどんな印象を持たれているかを表す数字。";
    case "B":
      return "バースデー・ナンバー。持って生まれた才能を引き出すための強みを表す数字。";
    case "M":
      return "マチュリティー・ナンバー。役割を果たしたあと、人生の後半で訪れる出来事を表す数字。";
    case "過去":
      return "前世を表す数字。自分が自然にできることを表す。バースデー・ナンバーと同じ。";
    case "現在":
      return "現世を表す数字。資質や才能、性格を表す。ライフ・パス・ナンバーと同じ。";
    case "未来":
      return "来世を表す数字。苦手なことや、可能性を表す。";
    default:
      return "-";
  }
};
