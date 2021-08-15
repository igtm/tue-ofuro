import { VFC } from "react";

type Props = {
  content: string;
};

export const DangerousHTML: VFC<Props> = (props) => {
  // 外部の API から取得した値を dangerouslySetInnerHTML で出力している
  // 出力された HTML にスタイルをあてにくい（styles/dangerous.css から）
  // Anchor の RSS には、contentSnippet というフィールドがあるので、そっちを使うのもあり

  return (
    <>
      <div
        className="dangerousHTML"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </>
  );
};
