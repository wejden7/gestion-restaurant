import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

export const DashboardContext = ({ children }) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export const UseStateDashboardContext = () => useContext(StateContext);
