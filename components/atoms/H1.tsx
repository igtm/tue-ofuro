import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const H1: FC<Props> = (props) => {
  const { children, ...headingElementProps } = props;

  return (
    <h1 {...headingElementProps} className="text-3xl text-gray-800">
      {children}
    </h1>
  );
};
