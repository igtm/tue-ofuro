import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const H2: FC<Props> = (props) => {
  const { children, ...headingElementProps } = props;

  return (
    <h2 {...headingElementProps} className="text-2xl text-gray-800">
      {children}
    </h2>
  );
};
