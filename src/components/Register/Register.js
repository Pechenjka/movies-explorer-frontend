import GeneralForm from "../GeneralForm/GeneralForm";
import "./Register.css";

const Register = () => {
  return (
    <GeneralForm
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
    >
      <fieldset className="form__fieldset">
        <label className="form__label">Имя</label>
        <input className="form__input" type="text" />
        <span className="form__span"></span>
        <label className="form__label">E-mail</label>
        <input className="form__input" type="email" />
        <span className="form__span"></span>
        <label className="form__label">Пароль</label>
        <input className="form__input" type="password" />
        <span className="form__span">Что-то пошло не так...</span>
      </fieldset>
    </GeneralForm>
  );
};

export default Register;
