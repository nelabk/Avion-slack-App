import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Channels from "./pages/Channels";
import Messages from "./pages/Messages";
import GeneralLayout from "./components/layout/GeneralLayout";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
