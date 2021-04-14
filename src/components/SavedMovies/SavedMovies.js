import "./SavedMovies.css";
import { Fragment, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useFormWithValidation from "../../hooks/useForm";

const SavedMovies = (props) => {
  const {
    loggedIn,
    isSavedMovie,
    onSearchFilms,
    handleLikeClick,
    isNotFoundSearch,
    setIsShortMovies,
    isShortMovies,
    setIsSavedMovie,
    initialisSavedMovie,
  } = props;
  const [isSaved, setIsSaved] = useState(false);

  const { values, handleChange, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
    resetForm();
  };

  useEffect(() => {
    setIsSaved(true);
  }, [setIsSaved]);

  const shortSavedFilms = isSavedMovie.filter((item) => {
    return item.duration <= 40;
  });

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (isShortMovies === false) {
      setIsSavedMovie(initialisSavedMovie);
    }

    if (isShortMovies === true && shortSavedFilms) {
      setIsSavedMovie(shortSavedFilms);
    }
        // eslint-disable-next-line
  }, [isShortMovies, setIsSavedMovie]);

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <section className="savedMovies">
        <SearchForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          isSaved={isSaved}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
        />
        <MoviesCardList
          showMovies={isSavedMovie}
          isSaved={isSaved}
          handleLikeClick={handleLikeClick}
          isSavedMovie={isSavedMovie}
          isNotFoundSearch={isNotFoundSearch}
        />
      </section>
      <Footer />
    </Fragment>
  );
};

export default SavedMovies;
