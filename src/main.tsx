import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GameContextProvider from "./context/gameContext/GameContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./utils/coreUtils/objectUtils.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameContextProvider>
  </StrictMode>,
);
