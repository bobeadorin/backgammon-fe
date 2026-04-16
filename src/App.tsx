import { Route, Routes } from "react-router-dom";
import "./App.css";
import GamePage from "./components/gamePage/GamePage";
import Home from "./components/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;
