import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import "./Main.css";

const Main = () => {
  return (
    <main className="content">
      <Promo />
      <AboutProject/>
      <Techs/>
    </main>
  );
};

export default Main;
