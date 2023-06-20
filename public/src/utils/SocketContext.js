import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
//import { useNavigate } from 'react-router-dom';

const SocketContext = createContext();







const socket = io('https://nodevideochat-production.up.railway.app');


const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [stream, setStream] = useState();
  const [name, setName] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  //const navigate = useNavigate();

  const loadUser = () => {

    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    );

    if(!data){

       setName('User');
    }
    else {

       setName(data.username);
    }

  }

  useEffect(() => {


    loadUser();


    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

  

    
  }, []);

  const answerCall = () => {

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(connectionRef);
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true)
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    connectionRef.current = null;
  
  };

  const toggleVideo = () => {
    setVideoEnabled((prevVideoEnabled) => !prevVideoEnabled);
    stream.getVideoTracks()[0].enabled = !videoEnabled;
  };


  const toggleAudio = () => {
    setAudioEnabled((prevVideoEnabled) => !prevVideoEnabled);
    stream.getAudioTracks()[0].enabled = !audioEnabled;
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      callEnded,
      me,
      audioEnabled,
      videoEnabled,
      isModalOpen,
      setIsModalOpen,
      toggleAudio,
      toggleVideo,
      callUser,
      leaveCall,
      answerCall,
      setStream
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };