import AboutMe from "../AboutMe/AboutMe";
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
      <AboutMe/>
    </main>
  );
};

export default Main;
