import type { GameBoard } from "../../types/gameTypes";
import { useGameContext } from "../../hooks/UseGameContext";
import Triangle from "../sectionTriangle/Triangle";
import "./BoardSectionStyles.css";

type BoardSectionProps = {
  isDown: boolean;
  points: GameBoard;
};

export default function BoardSection({ isDown, points }: BoardSectionProps) {
  const { state, dispatch } = useGameContext();

  return (
    <section className="board-section">
      {points.map((point: any) => (
        <Triangle
          key={point.id}
          isDown={isDown}
          pieces={point.pieces}
          id={point.id}
          hasPossibleMove={point.possibleMoves.length > 0}
          isPossibleMove={state.possibleMoves.includes(point.id)}
        />
      ))}
    </section>
  );
}

// <Triangle key={point.id} isDown={isDown} pieces={point.pieces} id={point.id} isPossibleMove={possibleMoves.includes(point.id)} />
