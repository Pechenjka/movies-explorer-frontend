import AuthForm from "../AuthForm/AuthForm";

const Login = () => {
  return (
    <AuthForm
      title="Рады видеть!"
      buttonName="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkPath="/signup"
    />
  );
};

export default Login;
