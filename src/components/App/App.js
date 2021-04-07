import { Route, Switch, useHistory } from "react-router";
import { useEffect, useState } from "react";
import "./App.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/MainApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
    // eslint-disable-next-line
  }, []);

  const handleRegister = (values) => {
    const { name, email, password } = values;
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          handleLogin(values);
        }
      })
      .catch((err) => {
        if (err) {
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        if (err) {
          console.log({ message: "Необходимо пройти авторизацию" });
        }
      });
  };

  const tokenCheck = () => {
    mainApi.getContent().then((res) => {
      if (res) {
        history.push("/movies");
      }
    });
  };

  const handleLoggidIn = () => {
    setLoggedIn(true);
  };
  const handleIsLoading = () => {
    setIsLoading(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main loggedIn={loggedIn} />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <Header loggedIn={loggedIn} />
            <Movies handleLoggidIn={handleLoggidIn} isLoading={isLoading} handleIsLoading={handleIsLoading} />
            <Footer />
          </Route>
          <Route exact path="/saved-movies">
            <Header loggedIn={loggedIn} />
            <SavedMovies handleLoggidIn={handleLoggidIn} />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/profile">
            <Header loggedIn={loggedIn} />
            <Profile handleLoggidIn={handleLoggidIn} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
