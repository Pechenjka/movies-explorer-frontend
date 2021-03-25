import "./SavedMovies.css";
import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

const SavedMovies = (props) => {
  const { setLoggedIn, setButtonAddViewFilms } = props;
  const savedCards = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  useEffect(() => {
    setIsSaved(true);
  }, [setIsSaved]);
  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList cards={savedCards} setButtonAddViewFilms={setButtonAddViewFilms} isSaved={isSaved} />
    </section>
  );
};

export default SavedMovies;
