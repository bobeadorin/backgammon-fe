import "./HomeStyles.css";

export default function Home() {
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
          <button>🎲 Singleplayer</button>
          <button>🌐 Multiplayer</button>
          <button>🤖 vs Computer</button>
        </div>
      </div>
    </section>
  );
}
