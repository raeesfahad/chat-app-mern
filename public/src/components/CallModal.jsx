import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CallModal = ({ closeModal, makeCall }) => {
  const [callId, setCallId] = useState('');

  const handleCallIdChange = (event) => {
    setCallId(event.target.value);
  };

  const handleMakeCall = () => {
    makeCall(callId);
    closeModal();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Make a Call</h2>
        <Input
          type="text"
          placeholder="Call ID"
          value={callId}
          onChange={handleCallIdChange}
        />
        <Button onClick={handleMakeCall}>Make Call</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default CallModal;
