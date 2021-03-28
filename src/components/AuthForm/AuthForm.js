import { Link, useLocation } from "react-router-dom";
import "./AuthForm.css";
import Logo from "../../images/logo-header.svg";
import { Fragment } from "react";

const AuthForm = (props) => {
  const { title, buttonName, textLink, text, linkPath } = props;
  const { pathname } = useLocation();

  return (
    <div className="container">
      <Link to="/">
        <img className="form__logo" src={Logo} alt="Лого формы" />
      </Link>
      <h2 className="form__title">{title}</h2>
      <form className="form">
        <fieldset className="form__fieldset">
          {pathname !== "/signin" && (
            <Fragment>
              <label className="form__label">Имя</label>
              <input className="form__input" type="text" name="text" id="text" minLength="2" maxLength="30" required />
              <span className="form__span" id="text-error"></span>
            </Fragment>
          )}
          <label className="form__label">E-mail</label>
          <input className="form__input" type="email" name="email" id="email" required />
          <span className="form__span" id="email-error"></span>
          <label className="form__label">Пароль</label>
          <input className="form__input" type="password" name="password" id="password" minLength="8" required />
          <span className="form__span" id="password-error">
            Что-то пошло не так...
          </span>
        </fieldset>
        <button className="form__button">{buttonName}</button>
        <p className="form__link-text">
          {text}
          <Link className="form__link" to={linkPath}>
            {textLink}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
