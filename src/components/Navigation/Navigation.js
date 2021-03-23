import { Link } from "react-router-dom";
import "./Navigation.css";
import HeaderLogo from "../../images/logo-header.svg";

const Navigation = ({ itemsNavigation }) => {
  return (
    <nav className="navigation">
      <Link to='/'>
        <img className="navigation__logo" src={HeaderLogo} alt="лого" />
      </Link>
      <ul className="navigation__list-links">
        {itemsNavigation.map((item) => {
          return (
            <li className="navigation__link-container" key={item.id}>
              <Link className={`navigation__link ${item.classButton}`} to={item.path}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
