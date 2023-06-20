import React from 'react';
import styled from 'styled-components';

const VideoChatBox = styled.div`
  width: 500px;
  height: 400px;
  position: relative; /* Add position relative */
  /* Remove background-color and border-radius */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333333;

  /* Add new styles */
  border: 2px solid #ffffff; /* Add solid white border */
  padding: 8px; /* Add padding for the border */

  &:before {
    content: '${props => props.participant}'; /* Show participant name */
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    color: #ffffff; /* Set text color to white */
  }
`;

// Component that renders the video chat box
const VideoChat = ({ participant }) => {
  return (
    <VideoChatBox>
      {participant}
    </VideoChatBox>
  );
};

export default VideoChat;
