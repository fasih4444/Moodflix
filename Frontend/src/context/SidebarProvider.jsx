import { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./types";

const initialState = {
  isSidebarVisible: false,
  memojiSrc: null,
  age: null,
  gender: null,
  glasses: null,
  emotions: null
};

const SidebarContext = createContext();

const sidebarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarVisible: true,
        memojiSrc: payload.memojiSrc,
        age: payload.age,
        gender: payload.gender,
        glasses: payload.glasses,
        emotions: payload.emotions
      };
    }
    case actionTypes.CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarVisible: false
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, { ...initialState });
  const value = { state, dispatch };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarValue = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarValue must be used within a SidebarProvider");
  }

  return context;
};

export { SidebarProvider, useSidebarValue };
