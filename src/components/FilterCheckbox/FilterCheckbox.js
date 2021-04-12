import "./FilterCheckbox.css";

const FilterCheckbox = ({setIsShortMovies, isShortMovies}) => {

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies)
  }

  return (
    <fieldset className="filterCheckbox">
      <label className="filterCheckbox__input-switch">
        <input type="checkbox" className='filterCheckbox__input' onChange={handleShortMovies} /> Короткометражки
        <span className="filterCheckbox__input_slider"></span>
      </label>
    </fieldset>
  );
};

export default FilterCheckbox;
