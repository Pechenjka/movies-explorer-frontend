import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = () => {
  const cards = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
  ];

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {cards.map((item) => {
          return <MoviesCard key={item.id}/>
        })}
      </ul>
      <button className='moviesCardList__button'>Еще</button>
    </section>
  );
};

export default MoviesCardList;
