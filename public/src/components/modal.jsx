import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../utils/SocketContext';
import { useNavigate } from 'react-router-dom';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;


const ModalContent = styled.div`
  background-color: #131324;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff; /* Add this line to set the text color to white */
`;

const Text = styled.span`
  font-size: 16px;
  color: #ffffff; /* Update the text color to white */
  margin-bottom: 10px;
`;

const CodeSpan = styled.span`
  display: block;
  font-family: monospace;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
  color: #ffffff; /* Update the text color to white */
`;

const CallButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
  display: block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: blue;
  border-radius : 30px;
  width : 30px;
  height : 30px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ffffff;
`;

const CodeInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #ffffff; /* Set the background color to white */
  color: #333333; /* Set the text color to a darker shade */
`;

const CallOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #ffffff; /* Set the text color to white */
`;

const HrLine = styled.hr`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #ccc;
  border-color: #ffffff; /* Set the border color to white */
`;

const Modal = ({ onClose }) => {
  const [code, setCode] = useState('');
  const { me, callUser, isModalOpen, setIsModalOpen} = useContext(SocketContext);
  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleCallButtonClick = (event) => {
     
    event.preventDefault();
    setIsModalOpen(!isModalOpen);
    callUser(code);
    navigate('/video');
    
  };

  return (
    <ModalContainer>
      <ModalContent>
      <Text>Enter code of recipient</Text>
      <CodeInput
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={handleCodeChange}
        />
        <CloseButton onClick={()=>{setIsModalOpen(!isModalOpen)}}>&times;</CloseButton>
        <CallOptions>
          <CallButton onClick={handleCallButtonClick}>Call</CallButton>
          <HrLine />
          <span>OR</span>
        </CallOptions>
        <Text>Send your code to Recipient</Text>
        <CodeSpan>{me || 'loading...'}</CodeSpan>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
