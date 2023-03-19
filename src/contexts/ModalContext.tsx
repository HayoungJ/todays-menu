import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface IModalData {
  id?: string;
  onClose?: () => any; 
  onCancel?: () => any;
  onSubmit?: () => any;
};

const ModalContext = createContext<{
  openedModals: string[],
  openModal: (modalData: IModalData) => any;
  closeModal: (id: string) => any;
  modalData: IModalData;
}>({} as any);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [openedModals, setOpenedModal] = useState<string[]>([]);
  const [modalData, setModalData] = useState<IModalData>({});

  const openModal = ({ id, onClose, onCancel, onSubmit }: IModalData) => {
    if (!id) return;
    setOpenedModal([
      ...openedModals,
      id,
    ])
    setModalData({
      onClose,
      onCancel,
      onSubmit,
    });
  }

  const closeModal = (id: string) => {
    modalData.onClose?.();
    setOpenedModal(openedModals.filter((modal => modal !== id)));
    setModalData({});
  }

  return (
    <ModalContext.Provider value={{ openedModals, openModal, closeModal, modalData }}>
      { children }
    </ModalContext.Provider>
  )
};

export const useModal = () => useContext(ModalContext);