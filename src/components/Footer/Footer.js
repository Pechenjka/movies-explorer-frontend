import ListLinks from "../ListLinks/ListLinks";
import "./Footer.css";

const Footer = () => {
  const links = [
    { id: "1", name: "Яндекс.Практикум", path: "https://praktikum.yandex.ru/" },
    { id: "2", name: "Github", path: "https://github.com/PetyaLobachev" },
    { id: "3", name: "Vk", path: "https://vk.com/pe4enjkka" },
  ];
  return (
    <footer className="footer">
      <div className="footer__title-container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__links">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ListLinks links={links} />
      </div>
    </footer>
  );
};

export default Footer;
