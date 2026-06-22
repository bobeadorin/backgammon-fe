import { useState } from "react";
import "./ModalStyles.css";
import { useGameContext } from "../../../hooks/UseGameContext";
import { GameActionCreator } from "../../../game/gameReducer/gameActions";
import { useNavigate } from "react-router-dom";

export default function Modal() {
  const { dispatch } = useGameContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleYesBtn = () => {
    setShowModal(false);
  };

  const handleNoBtn = () => {
    dispatch(GameActionCreator.resetGame());
    setShowModal(false);
    navigate("/matchConfiguration");
  };

  return (
    <section className={showModal ? "modal" : "hidden"}>
      <div className="modal-text">
        <p>do you want to continue the game ? </p>
      </div>
      <div>
        <button onClick={handleYesBtn}>yes</button>
        <button onClick={handleNoBtn}>no</button>
      </div>
    </section>
  );
}
