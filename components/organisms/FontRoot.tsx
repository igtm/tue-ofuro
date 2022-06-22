import { VFC, ReactNode } from "react";
import { useCustomFontContext } from "../../context/CustomFont";

type Props = {
  children: ReactNode;
};

export const FontRoot: VFC<Props> = ({ children }) => {
  const customFontContext = useCustomFontContext();
  return (
    <div className="font-root" data-custom-font={customFontContext.activated}>
      {children}
    </div>
  );
};
