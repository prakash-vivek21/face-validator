import React from "react";
import Webcam from "./components/Webcam";
import Home from "./components/Home";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Webcam />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
