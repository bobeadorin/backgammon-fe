import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import GamePage from "./components/gamePage/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;
