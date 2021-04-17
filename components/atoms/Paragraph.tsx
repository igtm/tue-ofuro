import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Paragraph: FC<Props> = (props) => {
  const { children, ...paragraphElementProps } = props;

  return (
    <p {...paragraphElementProps} className="text-base text-gray-900 leading-7">
      {children}
    </p>
  );
};
