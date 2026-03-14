import { BoardSideType } from "../boardSection/boardSection.types";
import BoardSide from "../boardSide/BoardSide";
import "./BoardStyles.css";


export default function Board() {
  return (
    <div className="board">
      <BoardSide side={BoardSideType.LEFT} />
      <BoardSide side={BoardSideType.RIGHT} />
    </div>
  );
}
