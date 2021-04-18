import React, { createContext, useContext, useState, VFC } from "react";
import { PodcastEpisode } from "../types";

/**
 * FloatingPlayArea に関する Context で保持する値の型
 */
type FloatingPlayAreaState = {
  /**
   * FloatingPlayArea に表示するエピソード
   */
  podcastEpisode?: PodcastEpisode;
};

type FloatingPlayAreaDispatch = {
  updateFloatingPlayAreaState: (podcastEpisode: PodcastEpisode) => void;
  clearFloatingPlayAreaState: () => void;
};

const initialState: FloatingPlayAreaState = {
  podcastEpisode: undefined,
};

const FloatingPlayAreaStateContext = createContext<FloatingPlayAreaState>(
  initialState
);

const FloatingPlayAreaDispatchContext = createContext<FloatingPlayAreaDispatch>(
  {
    updateFloatingPlayAreaState: () => undefined,
    clearFloatingPlayAreaState: () => undefined,
  }
);

/**
 * FloatingPlayArea に関する Context を取得する
 */
export const useFloatingPlayAreaContext = () => {
  return useContext(FloatingPlayAreaStateContext);
};

/**
 * FloatingPlayArea に関する Context を更新するメソッドを取得する
 */
export const useFloatingPlayDispatchContext = () => {
  return useContext(FloatingPlayAreaDispatchContext);
};

type Props = {
  children: React.ReactNode;
};

export const FloatingPlayAreaStateProvider: VFC<Props> = (props) => {
  const [
    floatingPlayAreaState,
    setFloatingPlayAreaState,
  ] = useState<FloatingPlayAreaState>(initialState);

  const updateFloatingPlayAreaState = (podcastEpisode: PodcastEpisode) => {
    setFloatingPlayAreaState({ podcastEpisode });
  };

  const clearFloatingPlayAreaState = () => {
    setFloatingPlayAreaState({ podcastEpisode: undefined });
  };

  return (
    <FloatingPlayAreaStateContext.Provider value={floatingPlayAreaState}>
      <FloatingPlayAreaDispatchContext.Provider
        value={{ updateFloatingPlayAreaState, clearFloatingPlayAreaState }}
      >
        {props.children}
      </FloatingPlayAreaDispatchContext.Provider>
    </FloatingPlayAreaStateContext.Provider>
  );
};
