import "./SavedMovies.css";
import { Fragment, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useFormWithValidation from "../../hooks/useForm";

const SavedMovies = (props) => {
  const { loggedIn, isSavedMovie, onSearchFilms, handleLikeClick, isNotFoundSearch } = props;
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

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <section className="savedMovies">
        <SearchForm onSubmit={handleSubmit} values={values} handleChange={handleChange} isSaved={isSaved} />
        <MoviesCardList showMovies={isSavedMovie} isSaved={isSaved} handleLikeClick={handleLikeClick} isSavedMovie={isSavedMovie} isNotFoundSearch={isNotFoundSearch}/>
      </section>
      <Footer />
    </Fragment>
  );
};

export default SavedMovies;
