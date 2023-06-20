import React from 'react';
import styled from 'styled-components';
import { BiVideoOff , BiVolumeMute } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';




const ButtonRow = () => {
 
const navigate = useNavigate();

const handleClose = (event) => {

   event.preventDefault();
   navigate('/');


}
  return (
    <ButtonContainer>
      <Button><BiVideoOff /></Button>
      <Button><BiVolumeMute /></Button>
      <Button onClick={handleClose}>Close</Button>
    </ButtonContainer>
  );
};


// Styled component for the container
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// Styled component for the buttons
const Button = styled.button`
  margin: 0 15px;
  padding: 10px 20px;
  background-color: #800000;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;


export default ButtonRow;