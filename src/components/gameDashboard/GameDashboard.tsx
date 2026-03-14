import { useGameContext } from "../../hooks/UseGameContext";
import DiceRoller from "../dice/Dice";
import "./GameDashboardStyles.css";


export default function GameDashboard() {
  const {whitePlayer,blackPlayer} = useGameContext();



  return (
    <section className="boardDashBoard-container">
      <div className="player-dashboard-container">
      <div>{whitePlayer}</div>
      <div>{blackPlayer}</div>
      </div>
      <div className="firstRoll">
       <DiceRoller/>
      </div>
    </section>
  );
}