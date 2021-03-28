import AuthForm from "../AuthForm/AuthForm";


const Register = () => {
  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkPath='/signin'
    ></AuthForm>
  );
};

export default Register;
