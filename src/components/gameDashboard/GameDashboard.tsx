import { useGameContext } from "../../hooks/UseGameContext";
import "./GameDashboardStyles.css";

export default function GameDashboard() {
  const { state } = useGameContext();

  const playerData = state.currentPlayer ? state.currentPlayer?.name + " " + state.currentPlayer?.color : "Waiting for roll";

  return (
    <section className="boardDashBoard-container" style={{ color: "white", fontSize: "50px" }}>
      <div className="player-dashboard-container">
        <div> {!state.isRolling ? playerData : "isRolling"}</div>
        {!state.isRolling && state.diceRoll.map((value, index) => <span key={index}> {value}</span>)}
      </div>
      <div>possibleMoves</div>
      {state.possibleMoves.length > 0 ? state.possibleMoves.map((value) => <span>{value}</span>) : <span>no moves</span>}
    </section>
  );
}
