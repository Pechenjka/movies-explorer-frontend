import { Fragment, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = (props) => {
  const { handleLoggidIn, isLoading, handleIsLoading } = props;

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

  useEffect(() => {
    const timer = setTimeout(() => {
      handleIsLoading();
    }, 3000);
    return () => clearTimeout(timer);
  }, [handleIsLoading]);

  return (
    <Fragment>
      <SearchForm />
      {isLoading === true ? <Preloader /> : <MoviesCardList cards={cards} />}
      <button className="movies__button">Еще</button>
    </Fragment>
  );
};

export default Movies;
