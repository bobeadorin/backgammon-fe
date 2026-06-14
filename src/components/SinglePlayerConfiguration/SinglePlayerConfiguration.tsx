import { useState } from "react";
import "./SinglePlayerConfigurationStyles.css";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../hooks/UseGameContext";
import { Color } from "../../enums/PieceColor";
import { GAME_PHASE } from "../../enums/GameState";
import { GameActionsService } from "../../game/gameReducer/gameActions";

export default function SinglePlayerConfiguration() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [whitePlayerSide, setWhitePlayerSide] = useState<"player1" | "player2">("player1");
  const [activeCard, setActiveCard] = useState<"player1" | "player2" | null>(null);

  const { dispatch } = useGameContext();
  const navigate = useNavigate();

  const canStart = player1Name.trim().length > 0 && player2Name.trim().length > 0;

  const handleColorClick = (player: "player1" | "player2") => {
    setWhitePlayerSide(player);
  };

  const handleStart = () => {
    if (!canStart) return;

    if (whitePlayerSide === "player1") {
      dispatch(
        GameActionsService.setInitialPlayers(
          {
            name: player1Name.trim(),
            color: Color.WHITE,
            diceRoll: [],
          },
          {
            name: player2Name.trim(),
            color: Color.BLACK,
            diceRoll: [],
          },
        ),
      );
    } else {
      dispatch(
        GameActionsService.setInitialPlayers(
          {
            name: player2Name.trim(),
            color: Color.WHITE,
            diceRoll: [],
          },
          {
            name: player1Name.trim(),
            color: Color.BLACK,
            diceRoll: [],
          },
        ),
      );
    }
    dispatch(GameActionsService.setGameState(GAME_PHASE.INITIAL_ROLL));
    navigate("/game");
  };

  return (
    <main
      className={`single_player_configuration__container ${
        activeCard === "player1" ? "light-left" : activeCard === "player2" ? "light-right" : ""
      }`}
    >
      <h1 className="single_player_configuration__title">Single Player</h1>

      <div className="single_player_configuration__panel">
        {/* PLAYER 1 */}
        <div
          className={`single_player_configuration__player_card ${activeCard === "player1" ? "active" : ""}`}
          onClick={() => setActiveCard("player1")}
        >
          <div className="player_card__avatar">♔</div>

          <input
            className="player_card__input"
            type="text"
            placeholder="Player 1"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            maxLength={16}
          />

          <div className="player_card__colors">
            <span
              className={`color white ${whitePlayerSide === "player1" ? "selected" : ""}`}
              onClick={() => handleColorClick("player1")}
            />

            <span
              className={`color black ${whitePlayerSide !== "player1" ? "selected" : ""}`}
              onClick={() => handleColorClick("player2")}
            />
          </div>
        </div>

        {/* PLAYER 2 */}
        <div
          className={`single_player_configuration__player_card ${activeCard === "player2" ? "active" : ""}`}
          onClick={() => setActiveCard("player2")}
        >
          <div className="player_card__avatar">♚</div>

          <input
            className="player_card__input"
            type="text"
            placeholder="Player 2"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            maxLength={16}
          />

          <div className="player_card__colors">
            <span
              className={`color white ${whitePlayerSide === "player2" ? "selected" : ""}`}
              onClick={() => handleColorClick("player2")}
            />

            <span
              className={`color black ${whitePlayerSide !== "player2" ? "selected" : ""}`}
              onClick={() => handleColorClick("player1")}
            />
          </div>
        </div>
      </div>

      <button className="single_player_configuration__start" onClick={handleStart} disabled={!canStart}>
        Start Game
      </button>
    </main>
  );
}
