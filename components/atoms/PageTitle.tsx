import { DetailedHTMLProps, HTMLAttributes, VFC } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const PageTitle: VFC<Props> = ({ children, ...headingElementProps }) => {
  return (
    <h1 {...headingElementProps} className="text-4xl text-primary-800">
      {children}
    </h1>
  );
};
