import Board from "../board/Board";
import GameDashboard from "../gameDashboard/GameDashboard";
import "./GamePageStyles.css";

export default function GamePage() {
  return (
    <>
      <section className="main-page-section">
        <Board />
        <GameDashboard />
      </section>
    </>
  );
}
