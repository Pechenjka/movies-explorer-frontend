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
    filterMovies,
    setFilterMovies,
  } = props;
  const [isSaved, setIsSaved] = useState(false);

  const { values, handleChange } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
  };

  useEffect(() => {
    setIsSaved(true);
  }, [setIsSaved]);

  const shortSavedFilms = isSavedMovie.filter((item) => {
    return item.duration <= 40;
  });

  useEffect(() => {
    setFilterMovies(isSavedMovie);
  }, []);

  //Эффект показывает короткометражные фильмы из показанных на странице после поиска
  useEffect(() => {
    if (values.name !== "") {
      onSearchFilms(values.name);
    }
    if (isShortMovies) {
      setFilterMovies(shortSavedFilms);
    }
    if (!isShortMovies) {
      setFilterMovies(isSavedMovie);
    }
  }, [isShortMovies]);

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
