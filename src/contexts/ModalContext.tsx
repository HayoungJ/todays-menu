import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface IModalDispatch {
  onClose?: () => any; 
  onCancel?: () => any;
  onSubmit?: () => any;
};

const ModalContext = createContext<{
  isOpen: boolean,
  openModal: (modalDispatch: IModalDispatch) => any;
  closeModal: () => any;
  modalDispatch: IModalDispatch;
}>({} as any);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalDispatch, setModalDispatch] = useState<IModalDispatch>({});

  const openModal = ({ onClose, onCancel, onSubmit }: IModalDispatch) => {
    setIsOpen(true);
    setModalDispatch({
      onClose,
      onCancel,
      onSubmit,
    });
  }

  const closeModal = () => {
    modalDispatch.onClose?.();
    setIsOpen(false);
    setModalDispatch({});
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalDispatch }}>
      { children }
    </ModalContext.Provider>
  )
};

export const useModal = () => useContext(ModalContext);