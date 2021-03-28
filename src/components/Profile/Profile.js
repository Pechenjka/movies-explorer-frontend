import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = (props) => {
  const { handleLoggidIn } = props;
  const currentUserName = "Виталий";
  const currentUserEmail = "pochta@yandex.ru";
  
  useEffect(() => {
    handleLoggidIn();
  }, [handleLoggidIn]);

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUserName}!</h2>
      <form className="profile__form">
        <fieldset className="profile__form_fieldset">
          <label className="profile__form_label">Имя</label>
          <input
            className="profile__form_input"
            defaultValue={currentUserName}
            type="text"
            name="text"
            id="text"
            required
          />
          <span id="text-error"></span>
          <label className="profile__form_label">E-mail</label>
          <input
            className="profile__form_input"
            defaultValue={currentUserEmail}
            type="email"
            name="email"
            id="email"
            required
          />
          <span id="email-error"></span>
        </fieldset>
        <button className="profile__form_button">Редактировать</button>
        <Link to="/" className="profile__form_link">
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
};

export default Profile;
