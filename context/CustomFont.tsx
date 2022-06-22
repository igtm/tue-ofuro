import React, { createContext, useContext, useState, VFC } from "react";

/**
 * CustomFont に関する Context で保持する値の型
 */
type CustomFontState = {
  /**
   * CustomFont を有効にするかどうか
   */
  activated: boolean;
};

type CustomFontDispatch = {
  toggle: () => void;
};

const initialState: CustomFontState = {
  activated: false,
};

const CustomFontStateContext = createContext<CustomFontState>(initialState);

const CustomFontDispatchContext = createContext<CustomFontDispatch>({
  toggle: () => undefined,
});

/**
 * CustomFont に関する Context を取得する
 */
export const useCustomFontContext = () => {
  return useContext(CustomFontStateContext);
};

/**
 * CustomFont に関する Context を更新するメソッドを取得する
 */
export const useCustomFontDispatchContext = () => {
  return useContext(CustomFontDispatchContext);
};

type Props = {
  children: React.ReactNode;
};

export const CustomFontStateProvider: VFC<Props> = (props) => {
  const [customFontState, setCustomFontState] =
    useState<CustomFontState>(initialState);

  const toggle = () => {
    setCustomFontState((value) => ({ activated: !value.activated }));
  };

  return (
    <CustomFontStateContext.Provider value={customFontState}>
      <CustomFontDispatchContext.Provider value={{ toggle }}>
        {props.children}
      </CustomFontDispatchContext.Provider>
    </CustomFontStateContext.Provider>
  );
};
