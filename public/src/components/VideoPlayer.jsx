import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../utils/SocketContext';
import { useNavigate } from 'react-router-dom';
import { BiCamera, BiMicrophone } from 'react-icons/bi';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: #131324;
  color: #fff;
`;

const TopRightIcons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.i`
  font-size: 24px;
  padding: 5px;
  color: ${(props) => (props.active ? 'red' : 'inherit')};
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
`;

const CallContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const FormHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;
`;

const FormInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BlockButton = styled.button`
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #555;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`;


const BottomRightIcons = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: none;
`;

const OrText = styled.span`
  margin-top: 40px;
  font-size: 15px;
  color: #fff;
`;

const VideoCallPage = () => {
  const navigate = useNavigate();
  const { myVideo, setStream, toggleAudio, toggleVideo, audioEnabled, videoEnabled, me , callUser} = useContext(
    SocketContext
  );
  const [videoId, setVideoId] = React.useState('');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        navigate('/error');
      });
  }, [myVideo, navigate, setStream]);

  const handleMuteCamera = () => {
    toggleVideo();
  };

  const handleMuteMic = () => {
    toggleAudio();
  };

  const handleAddIdAndCall = () => {
   callUser(videoId);
   navigate('/video');
  };

  return (
    <Container>
      <TopRightIcons>
        <Icon active={videoEnabled}>
          <BiCamera />
        </Icon>
        <Icon active={audioEnabled}>
          <BiMicrophone />
        </Icon>
        <span style={{ fontSize: '1rem', color: 'yellow' }}>Connected</span>
      </TopRightIcons>
      <VideoWrapper>
      <CallContainer>
      <FormHeading>Request a Video Call</FormHeading>
      <FormInput
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter ID"
      />
      <ButtonContainer>
        <BlockButton onClick={handleAddIdAndCall}>Call</BlockButton>
      </ButtonContainer>
      <OrText>Or send your <span>ID</span> to the recipient</OrText>
      <p style={{marginTop : "20px", fontSize : "30px"}}>{me}</p>
    </CallContainer>
        <Video controls={false} playsInline ref={myVideo} autoPlay />
      </VideoWrapper>
      <BottomRightIcons>
        <Icon active={videoEnabled} onClick={handleMuteCamera}>
          <BiCamera />
        </Icon>
        <Icon active={audioEnabled} onClick={handleMuteMic}>
          <BiMicrophone />
        </Icon>
      </BottomRightIcons>
    </Container>
  );
};

export default VideoCallPage;
