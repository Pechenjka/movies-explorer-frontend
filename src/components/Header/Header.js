import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (props) => {
  const { loggedIn } = props;

  return (
    <header className={`header ${loggedIn === true ? "header-black" : ""} `}>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
