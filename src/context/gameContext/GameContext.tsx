import { createContext } from "react";
import { GameContextType } from "./types/gameContextTypes";

const GameContext = createContext<GameContextType | null>(null);

export default GameContext;
