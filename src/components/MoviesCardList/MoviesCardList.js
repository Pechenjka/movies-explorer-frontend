import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
  const { showMovies, isSaved } = props;

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {showMovies.map((item) => {
          return <MoviesCard isSaved={isSaved} key={item.id} item={item} />;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
