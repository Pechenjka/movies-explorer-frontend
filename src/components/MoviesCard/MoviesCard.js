import { useState } from "react";
import "./MoviesCard.css";

const MoviesCard = (props) => {
  const { isSaved} = props;

  const [addedSavedMovie, setAddedSavedMovie ] = useState(false)
  
  const handleSavedMovie = () => {
    setAddedSavedMovie(!addedSavedMovie)
  }

  const saved = `card__button-saved-movie ${(isSaved === true ? "card__button-icon-saved" : "") || (addedSavedMovie === true ? 'card__button-icon-handleSaved': '')}`;
  return (
    <li className="card">
      <div className="card_descripton-container">
        <p className="card__title">33 слова о дизайне</p>
        <p className="card__duration">1ч 47м</p>
        <button className={saved} onClick={handleSavedMovie}></button>
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
