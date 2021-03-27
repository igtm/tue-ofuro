import { CabalaNumber } from "../models/typeCabalaNumber";
import { ModernNumber } from "../models/typeModernNumber";

export const getNumberDescription = (number?: ModernNumber | CabalaNumber) => {
  switch (number) {
    case 1:
      return "自立心、積極性、行動力、開拓精神、リーダーシップ";
    case 2:
      return "協調性、受容性、繊細、感受性";
    case 3:
      return "喜び、楽観性、知性、ユーモア、社交性";
    case 4:
      return "安定、安心、現実的、具体性、まじめ";
    case 5:
      return "自由、好奇心、活発、変化、冒険心";
    case 6:
      return "愛情、親切心、育成力、配慮、正義感";
    case 7:
      return "探求心、研究心、洞察力、分析力、集中力";
    case 8:
      return "決断力、実行力、実現力、野心的、タフ";
    case 9:
      return "柔軟性、寛大さ、理解力、共感力";
    case 11:
      return "直観力、感じ取る力、伝える力、察する力、使命感";
    case 22:
      return "達成力、意志力、忍耐力、全身力、カリスマ性";
    case 33:
      return "豊かな感性、無条件の愛、許す力、貢献力";
    default:
      return;
  }
};
