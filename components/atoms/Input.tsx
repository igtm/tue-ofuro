import { DetailedHTMLProps, InputHTMLAttributes, VFC } from "react";

type Props = {
  /**
   * label 要素に渡す文字列
   */
  labelString?: string;

  /**
   * 補足説明として表示する文字列
   */
  description?: {
    id: string;
    string: string;
  };
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: VFC<Props> = (props) => {
  const { labelString, description, ...inputElementProps } = props;

  return (
    <div className="grid gap-2">
      {props.labelString != null ? (
        <label className="text-sm text-gray-800" htmlFor={props.id}>
          {props.labelString}
        </label>
      ) : null}

      <input
        {...inputElementProps}
        className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-base text-gray-800"
        aria-describedby={props.description?.id}
      />

      {props.description != null ? (
        <div id={props.description.id} className="text-xs text-gray-600">
          <p>{props.description.string}</p>
        </div>
      ) : null}
    </div>
  );
};
