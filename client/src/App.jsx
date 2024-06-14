import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  return (
    <>
      <GoogleOAuthProvider>
        <Header />
        <Outlet />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
