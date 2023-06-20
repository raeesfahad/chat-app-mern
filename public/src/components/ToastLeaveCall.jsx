import React from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Toast = styled.div`
  background-color: red;
  color: white;
  padding: 16px;
  border-radius: 4px;
`;

const ToastMessage = styled.p`
  margin: 0;
`;

const ToastComponent = ({ message }) => {
  return (
    <ToastContainer>
      <Toast>
        <ToastMessage>{message}</ToastMessage>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
