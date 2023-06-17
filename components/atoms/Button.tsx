import { ButtonHTMLAttributes, DetailedHTMLProps, VFC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: VFC<Props> = ({ children, ...buttonElementProps }) => {
  return (
    <button
      {...buttonElementProps}
      className="border border-gray-800 px-4 py-2 rounded bg-white text-base text-primary-800 focus:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};
