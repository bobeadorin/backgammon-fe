import { useGameContext } from "../../hooks/UseGameContext";
import "./GameDashboardStyles.css";


export default function GameDashboard() {
  const {whitePlayer,blackPlayer,currentPlayer} = useGameContext();

  

  return (
    <section className="boardDashBoard-container">
      <div className="player-dashboard-container">
      <div>{whitePlayer}</div>
      <div>{blackPlayer}</div>
      <div>{currentPlayer}</div>
      </div>
    </section>
  );
}