import { Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Video from "./pages/Video";
import Test from "./pages/test";
import NotificationBanner from "./components/NotificationBanner";
import { useContext } from "react";
import { SocketContext } from "./utils/SocketContext";
import ErrorPage from "./pages/Error";
export default function App() {


  const { call, callAccepted } = useContext(SocketContext);
  return (
    <>

    {call.name && !callAccepted &&(<NotificationBanner />)}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/video" element={<Video />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>

    </>
  );
}
