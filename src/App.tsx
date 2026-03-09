import "./App.css";
import BoardDashboard from "./components/boardDashBoard/BoardDashBoard";
import { BoardSideType } from "./components/boardSection/boardSection.types";
import BoardSide from "./components/boardSide/BoardSide";

function App() {
  return (
    <>
      <section className="main-page-section">
        <div className="board">
          <BoardSide side={ BoardSideType.LEFT} />
          <BoardSide side={ BoardSideType.RIGHT} />
        </div>
       <BoardDashboard/>
      </section>
    </>
  );
}

export default App;
