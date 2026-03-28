import { useGameContext } from "../../hooks/UseGameContext";
import "./GameDashboardStyles.css";

export default function GameDashboard() {
  const { possibleMoves, currentPlayer, diceRoll, isRolling } = useGameContext();

  return (
    <section className="boardDashBoard-container" style={{ color: "white", fontSize: "50px" }}>
      <div className="player-dashboard-container">
        <div>{currentPlayer}</div>
        {!isRolling && diceRoll.map((value, index) => <span key={index}> {value}</span>)}
      </div>
      <div>possibleMoves</div>
      {possibleMoves.length > 0 ? possibleMoves.map((value) => <span>{value}</span>) : <span>no moves</span>}
    </section>
  );
}
