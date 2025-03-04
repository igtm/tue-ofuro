import { DetailedHTMLProps, HTMLAttributes, VFC } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const SectionTitle: VFC<Props> = ({
  children,
  ...headingElementProps
}) => {
  return (
    <h2 {...headingElementProps} className="text-3xl text-primary-800">
      {children}
    </h2>
  );
};
