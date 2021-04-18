import { DetailedHTMLProps, HTMLAttributes, VFC } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Paragraph: VFC<Props> = ({
  children,
  ...paragraphElementProps
}) => {
  return (
    <p {...paragraphElementProps} className="text-base text-gray-900 leading-7">
      {children}
    </p>
  );
};
