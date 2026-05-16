import BearOffTray from "../bearOffTray/BearOffTray";
import { SIDES } from "../boardSection/boardSection.types";
import BoardSide from "../boardSide/BoardSide";
import DiceController from "../diceController/DiceController";
import "./BoardStyles.css";

export default function Board() {
  return (
    <div className="board">
      <DiceController />
      <BoardSide side={SIDES.LEFT} />
      <BoardSide side={SIDES.RIGHT} />
      <BearOffTray />
    </div>
  );
}
