import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Channels from "./pages/Channels";
import Messages from "./pages/Messages";
import GeneralLayout from "./components/layout/GeneralLayout";
import Login from "./components/auth/login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [directMsgUser, setDirectMsgUser] = useState([]);

  const handleDirectMsgUserChange = (email) => {
    setDirectMsgUser(email);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/channels/:id/messages" element={<Channels />} />
        <Route
          path="/messages/:userId/messages"
          element={
            <Messages
              directMsgUser={directMsgUser}
              onDirectMsgUserChange={handleDirectMsgUserChange}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <GeneralLayout>
              <Dashboard />
            </GeneralLayout>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
