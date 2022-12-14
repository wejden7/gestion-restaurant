import React, { createContext, useContext, useState, useEffect } from "react";
const StateContext = createContext();

export const DashboardContext = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("light");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onClickDark = () => {
    localStorage.setItem("dark", true);
    setMode("dark");
  };

  const onClickLight = () => {
    localStorage.removeItem("dark");
    setMode("light");
  };

  useEffect(() => {
    const thime = localStorage.getItem("dark");
    if (thime) setMode("dark");
  }, []);

  const cliskSideBar = () => {
    setOpen((l) => !l);
  };

  return (
    <StateContext.Provider
      value={{ open, cliskSideBar, mode, onClickDark, onClickLight,openModal,handleOpenModal,handleCloseModal }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateDashboardContext = () => useContext(StateContext);
