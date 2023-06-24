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

export const Input: VFC<Props> = ({
  labelString,
  description,
  touched,
  ...inputElementProps
}) => {
  return (
    <div className="grid gap-2">
      {labelString != null ? (
        <label
          className="text-sm text-primary-800"
          htmlFor={inputElementProps.id}
        >
          {labelString}
        </label>
      ) : null}

      <input
        {...inputElementProps}
        className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-base text-primary-800"
        aria-describedby={description?.id}
      />

      {description != null ? (
        <div id={description.id}>
          {description.errors != null &&
          description.errors.length > 0 &&
          touched === true ? (
            <>
              {description.errors.map((error) => {
                return (
                  <p className="text-xs text-red-600" key={error}>
                    {error}
                  </p>
                );
              })}
            </>
          ) : null}

          {description.note != null ? (
            <p className="text-xs text-primary-600">{description.note}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
