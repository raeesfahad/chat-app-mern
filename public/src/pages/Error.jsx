//import  { useState, } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #131324;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: #ffffff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 10px;
`;

const RetryButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
`;

const GoHomeButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;

const ErrorPage = () => {
  
    const navigate = useNavigate()

  const simulateError = () => {
    
     navigate(-1);
  };

  const goHome = () => {

    navigate('/');
  
  };

  return (
    <ErrorPageContainer>
          
          <ErrorMessage>An error occurred. Please try again later.</ErrorMessage>
          <ButtonContainer>
            <RetryButton onClick={simulateError}>Retry</RetryButton>
            <GoHomeButton onClick={goHome}>Go Home</GoHomeButton>
          </ButtonContainer>
    
    </ErrorPageContainer>
  );
};

export default ErrorPage;
