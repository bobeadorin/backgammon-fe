import { useState, type ReactNode } from "react";
import type { GameBoard } from "./GameContext";
import type { PieceFormat } from "../../types/type";
import { generateStandardBoard } from "../../utils/gameIntialization/inititalizeGameUtils";
import GameContext from "./GameContext";

interface GameContextProviderProps {
  children: ReactNode;
}

// enum GameState {
//   INITIAL_ROLL = "INITIAL_ROLL",
//   GAME_RUNNING = "GAME_RUNNING",
//   GAME_OVER = "GAME_OVER",
// }

export default function GameContextProvider({ children }: GameContextProviderProps) {

  // const [gameState, setGameState] = useState<GameState>();


  const [currentPlayer, setCurrentPlayer] = useState<string>("white");
  const [whitePlayer,setWhitePlayer] = useState<string>("");
  const [blackPlayer,setBlackPlayer] = useState<string>("");
  const [diceRoll, setDiceRoll] = useState<number[]>([]);
  const [boardPieces, setBoardPieces] = useState<GameBoard>(generateStandardBoard());
  const [selectedPiece, setSelectedPiece] = useState<PieceFormat | null>(null);
  const [hitPiece, setHitPiece] = useState<PieceFormat | null>(null);


  const initGame = () => {
    // setGameState(GameState.INITIAL_ROLL);
    setCurrentPlayer("white");
    setDiceRoll([]);
    setBoardPieces(generateStandardBoard());
  };

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
        whitePlayer,
        setWhitePlayer,
        blackPlayer,
        setBlackPlayer,
        diceRoll,
        setDiceRoll,
        boardPieces,
        setBoardPieces,
        selectedPiece,
        setSelectedPiece,
        hitPiece,
        setHitPiece,
        initGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
