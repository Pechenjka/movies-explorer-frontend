import "./Promo.css";
import Main_logo from "../../images/landing-logo.svg";
const Promo = () => {
  return (
    <section className="content_promo">
      <div className='promo__wraper'>
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__button">Узнать больше</button>
      </div>
      <img className="promo__logo" src={Main_logo} alt="Лого-глобус" />
    </section>
  );
};

export default Promo;
