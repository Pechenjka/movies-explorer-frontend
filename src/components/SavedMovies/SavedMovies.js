import "./SavedMovies.css";
import { Fragment, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const SavedMovies = (props) => {
  const { loggedIn } = props;
  const [isSaved, setIsSaved] = useState(false);

  const savedCards = [{ id: "1" }, { id: "2" }, { id: "3" }];

  // useEffect(() => {
  //   handleLoggidIn();
  // }, [handleLoggidIn]);

  useEffect(() => {
    setIsSaved(true);
  }, [setIsSaved]);

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <section className="savedMovies">
        <SearchForm />
        <MoviesCardList cards={savedCards} isSaved={isSaved} />
      </section>
      <Footer />
    </Fragment>
  );
};

export default SavedMovies;
