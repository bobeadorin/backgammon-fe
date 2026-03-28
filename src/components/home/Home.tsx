import { useState } from "react";
import "./HomeStyles.css";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../hooks/UseGameContext";
import { Color } from "../../enums/PieceColor";

export default function Home() {
  const [whiteName, setWhiteName] = useState("");
  const [blackName, setBlackName] = useState("");
  const { setWhitePlayer, setBlackPlayer } = useGameContext();
  const navigate = useNavigate();

  const canStart = whiteName.trim().length > 0 && blackName.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    setWhitePlayer({ name: whiteName.trim(), color: Color.WHITE, diceRoll: [] });
    setBlackPlayer({ name: whiteName.trim(), color: Color.WHITE, diceRoll: [] });
    navigate("/game");
  };

  return (
    <main className="home">
      <div className="home__panel">
        <h1 className="home__title">Backgammon</h1>

        <div className="home__inputs">
          <label className="home__label">
            White player
            <input
              className="home__input"
              value={whiteName}
              onChange={(e) => setWhiteName(e.target.value)}
              placeholder="Enter name"
              maxLength={16}
            />
          </label>

          <label className="home__label">
            Black player
            <input
              className="home__input"
              value={blackName}
              onChange={(e) => setBlackName(e.target.value)}
              placeholder="Enter name"
              maxLength={16}
            />
          </label>
        </div>

        <button className="home__start" type="button" onClick={handleStart} disabled={!canStart}>
          Start Game
        </button>

        <p className="home__hint">Roll to determine who starts. Doubles win, ties reroll.</p>
      </div>
    </main>
  );
}
