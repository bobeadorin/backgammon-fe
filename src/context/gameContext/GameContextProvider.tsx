import { useState, type ReactNode } from "react";
import type { GameBoard } from "./GameContext";
import type { PieceFormat } from "../../types/type";
import { generateStandardBoard } from "../../utils/gameIntialization/inititalizeGameUtils";
import GameContext from "./GameContext";

interface GameContextProviderProps {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps) {
  const [firstRollPlayer1, setFirstRollPlayer1] = useState<string>("white");
  const [firstRollPlayer2, setFirstRollPlayer2] = useState<string>("black");
  
  const [currentPlayer, setCurrentPlayer] = useState<string>("white");
  const [diceRoll, setDiceRoll] = useState<number[]>([]);
  const [boardPieces, setBoardPieces] = useState<GameBoard>(generateStandardBoard());
  const [selectedPiece, setSelectedPiece] = useState<PieceFormat | null>(null);
  const [hitPiece, setHitPiece] = useState<PieceFormat | null>(null);


  const initGame = () => {
    setBoardPieces(generateStandardBoard());
  };

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
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
