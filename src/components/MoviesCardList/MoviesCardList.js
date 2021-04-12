import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
  const { showMovies, isSaved, handleLikeClick } = props;

  // const handleSavedMovieClick = () => {
  //   // setAddedSavedMovie(!addedSavedMovie);
  //   handleSavedMovies(showMovies)
  // };

  // const isSaved = showMovies.some((item) => item.movieId === isSavedMovie.movieId)

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {showMovies.map((item) => {
          return (
            <MoviesCard
              key={item.movieId}
              item={item}
              isSaved={isSaved}
              handleLikeClick={handleLikeClick}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
