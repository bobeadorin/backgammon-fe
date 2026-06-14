import LocalStorageManager from "../../utils/LocalStorageManager/LocalStorageManager";
import Bar from "../bar/Bar";
import BearOffTray from "../bearOffTray/BearOffTray";
import { SIDES } from "../boardSection/boardSection.types";
import BoardSide from "../boardSide/BoardSide";
import DiceController from "../diceController/DiceController";
import Modal from "../genericComponents/modal/Modal";
import "./BoardStyles.css";

export default function Board() {
  const hasPreviousSave = LocalStorageManager.hasPreviousGameData();
  console.log(hasPreviousSave)
  return (
    <div className="board">
      <DiceController />
      <BoardSide side={SIDES.LEFT} />
      <BoardSide side={SIDES.RIGHT} />
      <BearOffTray />
      <Bar />
      {hasPreviousSave && <Modal />}
    </div>
  );
}
