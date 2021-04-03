import { createContext, FC, useContext, useState, useCallback } from "react";
import { PodcastEpisode } from "../types";

type FloatingPlayAreaState = {
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
    updateFloatingPlayAreaState: () => {},
    clearFloatingPlayAreaState: () => {},
  }
);

export const useFloatingPlayAreaContext = () => {
  return useContext(FloatingPlayAreaStateContext);
};

export const useFloatingPlayDispatchContext = () => {
  return useContext(FloatingPlayAreaDispatchContext);
};

export const FloatingPlayAreaStateProvider: FC = (props) => {
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
