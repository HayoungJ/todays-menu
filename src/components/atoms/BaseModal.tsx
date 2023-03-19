import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styled, { css } from 'styled-components';
import { useModal } from '../../contexts/ModalContext';

import BaseButton from './BaseButton';

const StyledModalWrap = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 20;
`;

const StyledModalBackground = styled.div`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      width: 100vw;
      height: 100vh;
    
      background-color: ${palette.black};
      opacity: 0.3;
    `;
  }}
`;

const StyledModal = styled.dialog`
  ${({ theme }) => {
    const { palette, borderRadius } = theme;
    return css`
      display: flex;
      flex-flow: column nowrap;

      width: 700px;
      min-height: 500px;

      margin: 0;
      padding: 0.7rem 1.3rem;

      background-color: ${palette.white};
      border: none;
      border-radius: ${borderRadius};

      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;
  }}
`;

const ModalTitle = styled.section``

const ModalContent = styled.section``

const ModalFooter = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;

  padding: 0.7rem;
  margin-top: auto;

  button {
    margin-left: 10px;
  }
`;

interface IBaseModal {
  Title: ReactNode;
  Content: ReactNode;
}

const BaseModal: FC<IBaseModal> = ({ Title, Content, ...props }) => {
  const { isOpen, closeModal, modalDispatch } = useModal();
  const { onCancel, onSubmit } = modalDispatch;

  return (
    <>
      { isOpen && createPortal(
        <StyledModalWrap {...props}>
          <StyledModalBackground />
          <StyledModal>
            <ModalTitle>{ Title }</ModalTitle>
            <ModalContent>{ Content }</ModalContent>
            <ModalFooter>
              { onCancel && onSubmit ?  
                <>
                  <BaseButton
                    label="취소"
                    color="gray"
                    width={10}
                    onClick={onCancel}
                  />
                  <BaseButton
                    label="등록"
                    color="red"
                    width={10}
                    onClick={onSubmit}
                  />
                </> :
                <BaseButton
                  label="닫기"
                  color="red"
                  width={10}
                  onClick={closeModal}
                />
              }
            </ModalFooter>
          </StyledModal>
        </StyledModalWrap>,
        document.querySelector('#modal-root') as HTMLDivElement
      )}
    </>
  );
}
  
export default BaseModal;