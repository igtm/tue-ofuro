import { VFC } from "react";

export const Fallback: VFC = () => {
  // 外部の API から取得した値を dangerouslySetInnerHTML で出力している
  // 出力された HTML にスタイルをあてにくい
  // Anchor の RSS には、contentSnippet というフィールドがあるので、そっちを使うのもあり

  return <div id="tue-ofuro">loading...</div>;
};
