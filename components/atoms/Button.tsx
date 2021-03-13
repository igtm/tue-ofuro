import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

// 親からの className 上書きを防止するため、props には className を含めない
type ButtonElementPropsWithoutClassName = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "className"
>;

type Props = ButtonElementPropsWithoutClassName;

export const Button: FC<Props> = (props) => {
  const { children, ...buttonElementProps } = props;

  return (
    <button
      className="border border-gray-800 px-4 py-2 rounded bg-white text-base text-gray-800 focus:bg-gray-100"
      {...buttonElementProps}
    >
      {children}
    </button>
  );
};
