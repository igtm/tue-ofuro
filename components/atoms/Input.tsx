import { DetailedHTMLProps, InputHTMLAttributes, VFC } from "react";

// 親からの className 上書きを防止するため、props には className を含めない
type InputElementPropsWithoutClassName = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

type Props = {
  /**
   * label 要素に渡す文字列
   */
  labelString?: string;
} & InputElementPropsWithoutClassName;

export const Input: VFC<Props> = (props) => {
  const { labelString, ...inputElementProps } = props;

  return (
    <div className="grid gap-2">
      {props.labelString != null ? (
        <label className="text-sm text-gray-800" htmlFor={props.id}>
          {props.labelString}
        </label>
      ) : null}

      <input
        className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-base text-gray-800"
        {...inputElementProps}
      />
    </div>
  );
};
