import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = (props) => {
  const { handleLoggidIn } = props;
  const currentUserName = "Виталий";
  const currentUserEmail = "pochta@yandex.ru";

  const [isEditProfile, setIsEditProfile] = useState(false);

  const isDisabledInput = isEditProfile === false && "disabled";

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
            disabled={isDisabledInput}
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
            disabled={isDisabledInput}
            required
          />
          <span id="email-error"></span>
        </fieldset>
        {isEditProfile === true ? (
          <Fragment>
            <span className="profile__saved-button-span" id="text-error">
              При обновлении профиля произошла ошибка.
            </span>
            <button className="profile__saved-button" type="submit">
              Сохранить
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button className="profile__form_button" onClick={() => setIsEditProfile(true)}>
              Редактировать
            </button>
            <Link to="/" className="profile__form_link">
              Выйти из аккаунта
            </Link>
          </Fragment>
        )}
      </form>
    </div>
  );
};

export default Profile;
