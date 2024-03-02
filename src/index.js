import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./PanelAdmin";
import CreateStudent from "./pages/CreateStudent";
import Profile from "./pages/Profile";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-student" element={<CreateStudent />} />
      <Route path="/student/:id" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
