import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { BiVideo, BiVideoOff, BiPhoneOff, BiVolumeFull, BiVolumeMute, } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../utils/SocketContext';
import ToastComponent from '../components/ToastLeaveCall';


const VideoCallPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-color: #131324;
  position: relative; /* Ensure the notification banner stays in the correct position */
`;

const VideoRow = styled.div`
   
display: flex;
margin-bottom: 40px;
margin-top: 60px; /* Add margin-top to create a gap between the notification banner and video container */
`;

const VideoContainer = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 10px;
  border: 1px solid #fff;
  margin-right: 20px;
  overflow: hidden; /* Ensure the video feed stays within the container */
  position: relative;
`;

const RecipientName = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-right: 10px;
  width : 100px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #ccc;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #aaa;
  }
`;

const EndButton = styled.button`
  margin-right: 10px;
  width : 100px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #ff0000; /* Set the background color to red */
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #aa0000; /* Set the hover background color to a darker shade of red */
  }
`;



const VideoCallPage = () => {

  const navigate = useNavigate();

  const { myVideo, videoEnabled, toggleVideo, toggleAudio, audioEnabled, userVideo, name, stream, callAccepted, call, callEnded, leaveCall, setStream } = useContext(SocketContext);
   
  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {

        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

      }).catch((error) =>{

        navigate('/error');
      })



  },[myVideo, navigate, setStream])


 

  const Closebtn = (event) => {

      event.preventDefault();
      leaveCall();
      navigate('/');

    
  }



  return (

    
    <VideoCallPageContainer>

    {
      callEnded && (

        <ToastComponent message={"Participant has left call"} />
      )
    }

      <VideoRow>

        {
          stream && (
        <VideoContainer>
        <RecipientName>{name || 'You'}</RecipientName>
        <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </VideoContainer>
       )}

   
         <VideoContainer>
        <RecipientName>'{call.name}</RecipientName>
        <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </VideoContainer>
      </VideoRow>
      <ButtonRow>
        <Button onClick={toggleVideo}>
          {videoEnabled ? <BiVideoOff /> : <BiVideo />}
        </Button>
        <Button onClick={toggleAudio}> {audioEnabled ? <BiVolumeMute />  : <BiVolumeFull />}</Button>
        <EndButton onClick={Closebtn}><BiPhoneOff/></EndButton>
      </ButtonRow>

    </VideoCallPageContainer>
  );
};

export default VideoCallPage;
