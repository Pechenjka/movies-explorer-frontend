import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = (props) => {
  const { setLoggedIn } = props;

  useEffect(() => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  return (
    <section>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
};

export default Movies;
