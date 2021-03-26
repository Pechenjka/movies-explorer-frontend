import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import HeaderLogo from "../../images/logo-header.svg";
import AccountLogo from "../../images/icon-account.svg";

const Navigation = (props) => {
  const { loggedIn } = props;

  const itemsNavigation = [
    { name: "Регистрация", path: "/signup", id: "1" },
    { name: "Вход", path: "/signin", className: "navigation__link-button", id: "2" },
  ];
  const AuthNavigation = [
    { name: "Фильмы", path: "/movies", id: "1" },
    { name: "Сохраненные фильмы", path: "/saved-movies", id: "2" },
    { name: "Аккаунт", path: "/profile", className: "navigation__link-account_logo", id: "3", AccountLogo },
  ];

  const classesLinkContainer = `navigation__link-container ${
    loggedIn === true ? "navigation__link-container_auth" : ""
  } `;

  return (
    <nav className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={HeaderLogo} alt="лого" />
      </Link>

      <ul className="navigation__list-links">
        {(loggedIn === true ? AuthNavigation : itemsNavigation).map((item) => {
          return (
            <li className={classesLinkContainer} key={item.id}>
              <NavLink
                className={`navigation__link ${item.className}`}
                activeClassName="navigation__link-current-address"
                to={item.path}
                src={item.AccountLogo}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
