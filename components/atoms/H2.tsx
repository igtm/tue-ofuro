import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

// 親からの className 上書きを防止するため、props には className を含めない
type HeadingElementPropsWithoutClassName = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  "className"
>;

type Props = HeadingElementPropsWithoutClassName;

export const H2: FC<Props> = (props) => {
  const { children, ...headingElementProps } = props;

  return (
    <h2 className="text-2xl text-gray-800" {...headingElementProps}>
      {children}
    </h2>
  );
};
