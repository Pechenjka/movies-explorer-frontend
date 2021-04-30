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
    filterMovies,
    setFilterMovies,
  } = props;
  const [isSaved, setIsSaved] = useState(false);

  const { values, handleChange } = useFormWithValidation();

  useEffect(() => {
    setIsShortMovies(false);
    setIsSaved(true);
    // eslint-disable-next-line
  }, [setIsSaved]);

  useEffect(() => {
    setFilterMovies(isSavedMovie);
  }, [setFilterMovies, isSavedMovie]);

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (values.name !== "") {
      onSearchFilms(values.name);
    }
    if (isShortMovies === true) {
      onSearchFilms(values.name);
    }
    if (isShortMovies === false) {
      setFilterMovies(isSavedMovie);
    }
    // eslint-disable-next-line
  }, [isShortMovies, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
  };

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
          showMovies={filterMovies}
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
