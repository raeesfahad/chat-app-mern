import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Calls() {

const navigate = useNavigate()

  
  return (
    <ButtonContainer>

      <Button onClick={() => { navigate('/test')}}>
        Request Video Call
      </Button>

    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  margin-top : 5px;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 25px;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  color : #ffffff
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
