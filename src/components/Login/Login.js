import { useHistory } from "react-router";
import useFormWithValidation from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";

const Login = ({ onLogin }) => {
  const { values, handleChange } = useFormWithValidation();

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values);
    history.push("/movies");
  };

  return (
    <AuthForm
      title="Рады видеть!"
      buttonName="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkPath="/signup"
      values={values}
      onSubmit={handleSubmit}
      onChange={handleChange}
    ></AuthForm>
  );
};

export default Login;
