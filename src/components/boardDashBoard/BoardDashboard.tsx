import { useGameContext } from "../../hooks/UseGameContext";
import DiceSection from "../diceSection/DiceSection";
import './BoardDashboardStyles.css'

export default function BoardDashboard() {


  return (
    <section className="boardDashBoard-container"> 
    <div className="firsRoll">


    </div>
    <DiceSection />
    
    

    </section>
  )
}
