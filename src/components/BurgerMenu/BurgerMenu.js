import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import AccountLogo from "../../images/icon-account.svg";

const BurgerMenu = ({ isBurgerMenu, setIsBurgerMenu }) => {
  const BurgerMenuLinks = [
    { name: "Главная", path: "/", id: "1" },
    { name: "Фильмы", path: "/movies", id: "2" },
    { name: "Сохраненные фильмы", path: "/saved-movies", id: "3" },
    { name: "Аккаунт", path: "/profile", className: "burgerMenu__link-account_logo", id: "4", AccountLogo },
  ];

  const burgerMenu = `burgerMenu ${isBurgerMenu === true ? "burgerMenu__active" : ""}`;

  return (
    <div className={burgerMenu}>
      <button
        className="burgerMenu__button_close"
        type="button"
        onClick={() => isBurgerMenu === true && setIsBurgerMenu(false)}
      ></button>
      <ul className="burgerMenu__list-container" onClick={() => isBurgerMenu === true && setIsBurgerMenu(false)}>
        {BurgerMenuLinks.map((item) => {
          return (
            <li className="burgerMenu__links-container" key={item.id} onClick={(e) => e.stopPropagation()}>
              <NavLink
                className={`burgerMenu__link ${item.className}`}
                activeClassName="burgerMenu__link-current-address"
                exact
                to={item.path}
                src={item.AccountLogo}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerMenu;
