import { useEffect, useState, type ReactNode } from "react";
import type { GameBoard } from "./GameContext";
import type { PieceFormat, Player } from "../../types/type";
import { generateStandardBoard } from "../../utils/gameIntialization/inititalizeGameUtils";
import GameContext from "./GameContext";
import { GameState } from "../../enums/GameState";
import { DICE_SIDES } from "../../components/dice/constants/dice-constants";
import { isTie, rand } from "../../utils/gameUtils/gameUtils";
import { Color } from "../../enums/PieceColor";

interface GameContextProviderProps {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps) {
  const [gameState, setGameState] = useState<GameState>(GameState.WAITING_FOR_INITIAL_ROLL);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [whitePlayer, setWhitePlayer] = useState<Player>({ name: "white", color: Color.WHITE, diceRoll: [] });
  const [blackPlayer, setBlackPlayer] = useState<Player>({ name: "black", color: Color.BLACK, diceRoll: [] });
  const [diceRoll, setDiceRoll] = useState<number[]>([]);
  const [initialDiceRoll, setInitialDiceRoll] = useState<{ white: number[]; black: number[] }>({ white: [], black: [] });
  const [boardPieces, setBoardPieces] = useState<GameBoard>(generateStandardBoard());
  const [selectedPiece, setSelectedPiece] = useState<PieceFormat | null>(null);
  const [hitPiece, setHitPiece] = useState<PieceFormat | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [possibleMoves, setPossibleMoves] = useState<number[]>([]);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  const rollForFirstPlayer = (): void => {
    let whiteRoll = [];
    let blackRoll = [];
    do {
      whiteRoll = [rand(), rand()];
      blackRoll = [rand(), rand()];
    } while (isTie(whiteRoll, blackRoll));

    const winner = calculateWinner(whiteRoll, blackRoll);

    setInitialDiceRoll({ white: whiteRoll, black: blackRoll });
    setCurrentPlayer(winner);
    setGameState(GameState.GAME_RUNNING);
  };

  const calculateWinner = (white: number[], black: number[]): Player => {
    const whiteDouble = white[0] === white[1];
    const blackDouble = black[0] === black[1];

    if (whiteDouble && !blackDouble) return { name: whitePlayer.name, color: Color.WHITE, diceRoll: [] };
    if (blackDouble && !whiteDouble) return { name: whitePlayer.name, color: Color.BLACK, diceRoll: [] };

    const whiteSum = white[0] + white[1];
    const blackSum = black[0] + black[1];

    return whiteSum > blackSum
      ? { name: whitePlayer.name, color: Color.WHITE, diceRoll: [] }
      : { name: whitePlayer.name, color: Color.BLACK, diceRoll: [] };
  };

  const rollDice = (): number[] => {
    const val1 = Math.floor(Math.random() * DICE_SIDES) + 1;
    const val2 = Math.floor(Math.random() * DICE_SIDES) + 1;

    if (val1 === val2) {
      setDiceRoll([val1, val2, val1, val2]);
      return [val1, val2];
    }

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
        possibleMoves,
        setPossibleMoves,
        isRolling,
        setIsRolling,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
