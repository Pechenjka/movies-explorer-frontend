import { Fragment, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = (props) => {
  const { handleLoggidIn } = props;

  const cards = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
  ];

  useEffect(() => {
    handleLoggidIn();
  }, [handleLoggidIn]);

  return (
    <Fragment>
      <SearchForm />
      <MoviesCardList cards={cards} />
      <button className="movies__button">Еще</button>
    </Fragment>
  );
};

export default Movies;
