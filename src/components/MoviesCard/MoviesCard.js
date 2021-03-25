import "./MoviesCard.css";
import iconSavedMovie from "../../images/icon-saved-movie.svg";

const MoviesCard = () => {
  return (
    <li className="card">
      <div className="card_descripton-container">
        <p className="card__title">33 слова о дизайне</p>
        <p className="card__duration">1ч 47м</p>
        <button className="card__button-saved-movie">
          <img
            className="card__icon-saved-movie"
            src={iconSavedMovie}
            alt="лого иконки сохранения"
            type="button"
            aria-label="Сщхранить карточку"
          />
        </button>
      </div>
      <iframe
        className="card__movie"
        src="https://www.youtube.com/embed/5MgBikgcWnY"
        title="Мой фильм"
        allowFullScreen
        alt="фильм"
      ></iframe>
    </li>
  );
};

export default MoviesCard;
