import React from "react";
import Webcam from "./components/Webcam";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Webcam />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
