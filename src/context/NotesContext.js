import React, { createContext, useReducer } from "react";
import { reducer as NotesReducer, initialState } from "../reducer/Notes";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotesReducer, initialState);
  return (
    <NotesContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
