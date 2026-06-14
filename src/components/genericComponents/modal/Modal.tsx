import "./ModalStyles.css";

export default function Modal() {
  return (
    <section className="modal">
      <div className="modal-text">
        <p>do you want to continue the game ? </p>
      </div>
      <div>
        <button>yes</button>
        <button>no</button>
      </div>
    </section>
  );
}
