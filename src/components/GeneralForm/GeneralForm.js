import { Link } from "react-router-dom";
import "./GeneralForm.css";
import Logo from "../../images/logo-header.svg";

const GeneralForm = (props) => {
  const { title, buttonName, textLink, text, children } = props;

  return (
    <div className="container">
       <Link to="/">
       <img className="form__logo" src={Logo} alt="Лого формы" />
      </Link>
      <h2 className="form__title">{title}</h2>
      <form className="form">
        {children}
        <button className="form__button">{buttonName}</button>
        <p className="form__link-text">
          {text}
          <Link className="form__link" to="/signin">
            {textLink}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default GeneralForm;
