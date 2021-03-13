import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

// 親からの className 上書きを防止するため、props には className を含めない
type HeadingElementPropsWithoutClassName = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  "className"
>;

type Props = HeadingElementPropsWithoutClassName;

export const H1: FC<Props> = (props) => {
  const { children, ...headingElementProps } = props;

  return (
    <h1 className="text-3xl text-gray-800" {...headingElementProps}>
      {children}
    </h1>
  );
};
