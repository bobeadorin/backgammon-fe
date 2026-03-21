import { useEffect, useState, type ReactNode } from "react";
import type { GameBoard } from "./GameContext";
import type { PieceFormat } from "../../types/type";
import { generateStandardBoard } from "../../utils/gameIntialization/inititalizeGameUtils";
import GameContext from "./GameContext";
import { GameState } from "../../enums/GameState";
import { DICE_SIDES } from "../../components/dice/constants/dice-constants";

interface GameContextProviderProps {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps) {
  const [gameState, setGameState] = useState<GameState>(GameState.WAITING_FOR_INITIAL_ROLL);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [whitePlayer, setWhitePlayer] = useState<string>("white");
  const [blackPlayer, setBlackPlayer] = useState<string>("black");
  const [diceRoll, setDiceRoll] = useState<number[]>([]);
  const [initialDiceRoll, setInitialDiceRoll] = useState<{ white: number[]; black: number[] }>({ white: [], black: [] });
  const [boardPieces, setBoardPieces] = useState<GameBoard>(generateStandardBoard());
  const [selectedPiece, setSelectedPiece] = useState<PieceFormat | null>(null);
  const [hitPiece, setHitPiece] = useState<PieceFormat | null>(null);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  const initGame = () => {
    setGameState(GameState.INITIAL_ROLL);
    setCurrentPlayer("black");
    setDiceRoll([]);
    setBoardPieces(generateStandardBoard());
  };

  const rollForFirstPlayer = (): void => {
    let whiteRoll = [];
    let blackRoll = [];
    do {
      whiteRoll = [Math.floor(Math.random() * DICE_SIDES) + 1, Math.floor(Math.random() * DICE_SIDES) + 1];
      blackRoll = [Math.floor(Math.random() * DICE_SIDES) + 1, Math.floor(Math.random() * DICE_SIDES) + 1];
    } while (whiteRoll[0] === whiteRoll[1] && whiteRoll[0] === blackRoll[1]);

    setInitialDiceRoll({ white: whiteRoll, black: blackRoll });
    setGameState(GameState.GAME_RUNNING);
  };

  const rollDice = (): number[] => {
    const val1 = Math.floor(Math.random() * DICE_SIDES) + 1;
    const val2 = Math.floor(Math.random() * DICE_SIDES) + 1;
    setDiceRoll([val1, val2]);

    return [val1, val2];
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        currentPlayer,
        setCurrentPlayer,
        whitePlayer,
        setWhitePlayer,
        blackPlayer,
        setBlackPlayer,
        rollForFirstPlayer,
        initialDiceRoll,
        rollDice,
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
