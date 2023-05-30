import React, { Fragment } from "react";
import "./Styles/App.css";
import { BrowserRouter } from "react-router-dom";
import MyNavbar from "./components/UI/navigation/MyNavbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
