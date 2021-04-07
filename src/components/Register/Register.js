import AuthForm from "../AuthForm/AuthForm";
import useFormWithValidation from "../../hooks/useForm";
import { useHistory } from "react-router-dom";

const Register = ({ onRegister }) => {
  const { values, handleChange } = useFormWithValidation();

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
    history.push("/movies");
  };
  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkPath="/signin"
      values={values}
      onSubmit={handleSubmit}
      onChange={handleChange}
    ></AuthForm>
  );
};

export default Register;
