import { Fragment, useEffect, useState } from "react";
import useFormWithValidation from "../../hooks/useForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = (props) => {
  const {
    isLoading,
    loggedIn,
    onSearchFilms,
    showMovies,
    setIsShortMovies,
    isShortMovies,
    handleAddMovies,
    setShowMovies,
    movies,
  } = props;

  const { values, handleChange, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
    resetForm();
  };

  const handleChangeAddMovies = () => {
    setShowMovies(handleAddMovies);
    console.log(movies);
    console.log(showMovies);
  };

  const hiddenButton = showMovies.length <= 3 || showMovies.length === movies.length ? "movies__button_hidden" : "";

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <div className="movies">
        <SearchForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
        />
        {isLoading === true ? <Preloader /> : <MoviesCardList showMovies={showMovies} />}
        <button className={`movies__button ${hiddenButton}`} onClick={handleChangeAddMovies}>
          Еще
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Movies;
