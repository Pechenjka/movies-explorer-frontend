import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
  const { cards, isSaved } = props;

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {cards.map((item) => {
          return <MoviesCard isSaved={isSaved} key={item.id}/>;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
