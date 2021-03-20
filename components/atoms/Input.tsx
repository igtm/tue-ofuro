import { DetailedHTMLProps, InputHTMLAttributes, VFC } from "react";

type Props = {
  /**
   * label 要素に渡す文字列
   */
  labelString?: string;

  /**
   * 入力要素に対する説明
   */
  description?: {
    id: string;
    note?: string;
    errors?: string[];
  };

  /**
   * ユーザーが編集済みかどうか
   */
  touched?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: VFC<Props> = (props) => {
  const { labelString, description, touched, ...inputElementProps } = props;

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
        <div id={props.description.id}>
          {props.description.errors != null &&
          props.description.errors.length > 0 &&
          props.touched === true ? (
            <>
              {props.description.errors.map((error) => {
                return (
                  <p className="text-xs text-red-600" key={error}>
                    {error}
                  </p>
                );
              })}
            </>
          ) : null}

          {props.description.note != null ? (
            <p className="text-xs text-gray-600">{props.description.note}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};