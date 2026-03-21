import type { GameBoard } from "../../context/gameContext/GameContext";
import Triangle from "../sectionTriangle/Triangle";
import "./BoardSectionStyles.css";

type BoardSectionProps = {
  isDown: boolean;
  points: GameBoard;
};

export default function BoardSection({ isDown, points }: BoardSectionProps) {
  return (
    <section className="board-section">
      {points.map((point) => (
        <Triangle key={point.id} isDown={isDown} pieces={point.pieces} id={point.id} />
      ))}
    </section>
  );
}
