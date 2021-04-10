import { useState } from "react";
import "./MoviesCard.css";

const MoviesCard = (props) => {
  const { isSaved, item } = props;


  const [addedSavedMovie, setAddedSavedMovie] = useState(false);

  const image = !item.image ? "" : `https://api.nomoreparties.co${item.image.url}`;

  const handleSavedMovie = () => {
    setAddedSavedMovie(!addedSavedMovie);

  };

  const saved = `card__button-saved-movie ${
    (isSaved === true ? "card__button-icon-saved" : "") ||
    (addedSavedMovie === true ? "card__button-icon-handleSaved" : "")
  }`;

const getTime = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'ч ' + minutes + 'm'
}

  return (
    <li className="card">
      <div className="card_descripton-container">
        <p className="card__title">{item.nameRU}</p>
        <p className="card__duration">{getTime(item.duration)}</p>
        <button className={saved} onClick={handleSavedMovie}></button>
      </div>
      <img className="card__movie" src={image} alt="постер" />
    </li>
  );
};

export default MoviesCard;
