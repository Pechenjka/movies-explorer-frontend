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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  // const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    moviesApi
      .searchFilms()
      .then((res) => {
        if (res) {
          localStorage.setItem("storageMovies", JSON.stringify(res));
          // setMovies(res);
          console.log(res);
        }
      })
      .catch(() => {
        console.log({ message: "Фильмы не получены х.з. почему" });
      });
  }, []);

  const handleSearchFilms = (word) => {
    const storageMovies = JSON.parse(localStorage.getItem("storageMovies"));
    const searchByWords = storageMovies.filter((item) => {
      if (isShortMovies) {
       return item.duration <= 40 && item.year.toLowerCase().includes(word);
      }
      // console.log(item.nameRU);
      return item.year.toLowerCase().includes(word);
    });
    setShowMovies(searchByWords);
  };


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
          handleErrorSubmit();
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
          handleGetUserInfo();
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };

  const tokenCheck = () => {
    mainApi.getContent().then((res) => {
      if (res) {
        handleGetUserInfo();
        setLoggedIn(true);
        history.push("/movies");
      }
    });
  };

  const handleGetUserInfo = () => {
    mainApi
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch(() => console.log("Пользователь не найден"));
  };

  const handleSignOut = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      localStorage.removeItem("jwt");
    }
  };

  const handleUpdateUser = (values) => {
    const { email, name } = values;
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };

  const handleErrorSubmit = () => {
    setErrorSubmit(true);
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
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onSearchFilms={handleSearchFilms}
            showMovies={showMovies}
            setIsShortMovies={setIsShortMovies}
            isShortMovies={isShortMovies}
          />
          <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} />
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            errorSubmit={errorSubmit}
          />
          <Route exact path="/signup">
            <Register onRegister={handleRegister} errorSubmit={errorSubmit} setErrorSubmit={setErrorSubmit} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} errorSubmit={errorSubmit} setErrorSubmit={setErrorSubmit} />
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
