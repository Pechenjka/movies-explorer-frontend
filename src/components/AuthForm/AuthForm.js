import { Link, useLocation } from "react-router-dom";
import "./AuthForm.css";
import Logo from "../../images/logo-header.svg";

const AuthForm = (props) => {
  const { title, buttonName, textLink, text } = props;

  return (
    <div className="container">
      <Link to="/">
        <img className="form__logo" src={Logo} alt="Лого формы" />
      </Link>
      <h2 className="form__title">{title}</h2>
      <form className="form">
        <fieldset className="form__fieldset">
          <label className="form__label">Имя</label>
          <input className="form__input" type="text" />
          <span className="form__span"></span> <label className="form__label">E-mail</label>
          <input className="form__input" type="email" />
          <span className="form__span"></span>
          <label className="form__label">Пароль</label>
          <input className="form__input" type="password" />
          <span className="form__span">Что-то пошло не так...</span>
        </fieldset>
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

export default AuthForm;
