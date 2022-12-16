import React, { useState } from "react";

export default function useModel() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return { openModal, handleOpenModal, handleCloseModal };
}
