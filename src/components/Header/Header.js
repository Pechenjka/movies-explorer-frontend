import { Route, Switch } from "react-router";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const itemsNavigation = [
    { name: "Регистрация", path: "", id: "1" },
    { name: "Вход", path: "", classButton:'header__link-button', id: "2" },
  ];
  return (
    <header className="header">
      <Switch>
        <Route>
          <Navigation itemsNavigation={itemsNavigation} />
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
