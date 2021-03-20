import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<Props> = (props) => {
  const { children, ...buttonElementProps } = props;

  return (
    <button
      {...buttonElementProps}
      className="border border-gray-800 px-4 py-2 rounded bg-white text-base text-gray-800 focus:bg-gray-100"
    >
      {children}
    </button>
  );
};
