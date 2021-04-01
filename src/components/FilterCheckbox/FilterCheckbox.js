import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <fieldset className="filterCheckbox">
      <label className="filterCheckbox__input-switch">
        <input type="checkbox" className='filterCheckbox__input' /> Короткометражки
        <span className="filterCheckbox__input_slider"></span>
      </label>
    </fieldset>
  );
};

export default FilterCheckbox;
