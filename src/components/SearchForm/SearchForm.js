import "./SearchForm.css";
import logoSearch from "../../images/logo-search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <section className="searchForm">
      <form className="searchForm__form">
        <fieldset className='searchForm__form-fieldset'>
          <input
            className="searchForm__form-input"
            id="movies"
            placeholder="Фильм"
            type="search"
            name="movies"
            required
          />
          <button className="searchForm__button">
            <img src={logoSearch} alt="лого поиска" />
          </button>
        </fieldset>
        <FilterCheckbox/>
      </form>
    </section>
  );
};

export default SearchForm;
