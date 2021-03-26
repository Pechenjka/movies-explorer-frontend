import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
  const { cards } = props;

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {cards.map((item) => {
          return <MoviesCard key={item.id}/>;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
