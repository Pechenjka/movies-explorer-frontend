import { useState } from "react";
// import { useLocation } from "react-router";
import "./MoviesCard.css";

const MoviesCard = (props) => {
  const { item, isSaved, handleLikeClick } = props;
  // const path = useLocation()
  // const SaveAndDeleteMovie = path ==='/saved-movie'? item._id : item

  const handleSavedMovieClick = () => {
    handleLikeClick(item)
    setIsSavedMovieButton(!isSavedMovieButton)
  };

  const [isSavedMovieButton, setIsSavedMovieButton] = useState(false);

  // const isSaved = isSavedMovie.some((item) => item.movieId === showMovies.movieId)

  const saved = `card__button-saved-movie ${
    (isSaved === true ? "card__button-icon-saved" : "") ||
    (isSavedMovieButton === true ? "card__button-icon-handleSaved" : '')
  }`;

  const getTime = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "m";
  };

  return (
    <li className="card">
      <div className="card_descripton-container">
        <p className="card__title">{item.nameRU}</p>
        <p className="card__duration">{getTime(item.duration)}</p>
        <button className={saved} onClick={handleSavedMovieClick}></button>
      </div>
      <a href={item.trailer} target="_blanck">
        <img className="card__movie" src={item.image} alt="постер" />
      </a>
    </li>
  );
};

export default MoviesCard;
