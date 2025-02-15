import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Channels from "./pages/Channels";
import Messages from "./pages/Messages";
import GeneralLayout from "./components/layout/GeneralLayout";
import Login from "./components/auth/login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/channels"
          element={
            <GeneralLayout>
              <Channels />
            </GeneralLayout>
          }
        />
        <Route
          path="/messages/:userId"
          element={
            <GeneralLayout>
              <Messages />
            </GeneralLayout>
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
