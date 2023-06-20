import React, { useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../utils/SocketContext';
import { useNavigate } from 'react-router-dom';

const BannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #007bff;
  color: #ffffff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap : 30px;
`;

const Message = styled.h2`
  font-size: 18px;
  margin-right: 10px;
`;

const AnswerButton = styled.button`
  background-color: transparent;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const DeclineButton = styled(AnswerButton)`
  background-color: #dc3545;
  margin-right: 10px;

  &:hover {
    background-color: rgba(220, 53, 69, 0.8);
  }
`;

const NotificationBanner = () => {

    const navigate = useNavigate()


    const pickCall = (event) => {

        event.preventDefault();
        answerCall();
        navigate('/video');



    }

   const {call, answerCall, leaveCall } = useContext(SocketContext);

  return (
    <BannerContainer>
      <BannerContent>
      <Message>You have a Video Call from { call.name || "Recipient"}</Message>
      <AnswerButton onClick={pickCall}>Answer</AnswerButton>
        <DeclineButton onClick={leaveCall}>Decline</DeclineButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default NotificationBanner;
