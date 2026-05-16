import { useNavigate } from "react-router-dom";
import "./HomeStyles.css";
import { useGameContext } from "../../hooks/UseGameContext";
import { ACTIONS, GAME_MODE } from "../../game/gameReducer/gameActionTypes";

export default function Home() {
  const { dispatch } = useGameContext();

  const navigate = useNavigate();

  const handleSinglePlayerClick = () => {
    dispatch({ type: ACTIONS.SET_GAMEMODE, payload: GAME_MODE.SINGLEPLAYER });

    navigate("/matchConfiguration");
  };
 
  return (
    <section className="home__container">
      <div className="lamp">
        <div className="lamp__cord"></div>
        <div className="lamp__bulb"></div>
        <div className="lamp__light"></div>
      </div>
      <p className="home__title">BACKGAMMON</p>
      <div className="home__selection_container">
        <img src="src/assets/homeImg.jpg" alt="" />
        <div className="home__buttons">
          <button onClick={handleSinglePlayerClick}>Singleplayer</button>
          <button>Computer</button>
          <button>Multiplayer</button>
        </div>
      </div>
    </section>
  );
}
