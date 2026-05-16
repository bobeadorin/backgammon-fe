import { Route, Routes } from "react-router-dom";
import "./App.css";
import GamePage from "./components/gamePage/GamePage";
import Home from "./components/home/Home";
import SinglePlayerConfiguration from "./components/SinglePlayerConfiguration/SinglePlayerConfiguration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/matchConfiguration" element={<SinglePlayerConfiguration />} />
    </Routes>
  );
}

export default App;
