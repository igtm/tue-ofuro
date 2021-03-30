import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const GeomancyButton: FC<Props> = (props) => {
  const { children, ...buttonElementProps } = props;

  return (
    <button
      {...buttonElementProps}
      className="border border-gray-800 px-6 py-3 rounded bg-white text-lg text-gray-800 focus:bg-gray-100 active:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};
