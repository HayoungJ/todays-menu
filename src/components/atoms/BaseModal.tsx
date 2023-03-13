import { FC, ReactNode } from 'react';

import styled, { css } from 'styled-components';

const StyledModalWrap = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 10;
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

const ModalFooter = styled.section``

interface IModal {
  Title: ReactNode;
  Content: ReactNode;
  Footer: ReactNode;
}

const BaseModal: FC<IModal> = ({ Title, Content, Footer, ...props }) => {
  return (
    <StyledModalWrap {...props}>
      <StyledModalBackground />
      <StyledModal>
        <ModalTitle>{ Title }</ModalTitle>
        <ModalContent>{ Content }</ModalContent>
        <ModalFooter>{ Footer }</ModalFooter>
      </StyledModal>
    </StyledModalWrap>
  );
}
  
export default BaseModal;