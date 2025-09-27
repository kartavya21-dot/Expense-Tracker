import { useState } from "react";
import "./App.css";
import Tracker from "./components/Tracker/Tracker";
import Auth from "./components/Auth/Auth";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access"));

  if (!token) return <Auth setToken={setToken} />;
  
  return (
    <div className="app">
      {}
      <Tracker token={token} />
    </div>
  );
}

export default App;
