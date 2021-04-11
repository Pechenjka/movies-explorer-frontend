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
  const [movies, setMovies] = useState([]);
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

  //Сохранение массива фильмов из внешнего API в локальное хранилище
  const getMovies = () => {
    setIsLoading(true);
    moviesApi
      .searchFilms()
      .then((res) => {
        if (res) {
          localStorage.setItem("storageMovies", JSON.stringify(res));
          console.log(res);
          console.log(window.innerWidth);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (loggedIn) {
      getMovies();
    }
  }, [loggedIn]);

  // Поиск фильмов по ключевым словам в локальном хранилище
  const handleSearchByWord = (word) => {
    const storageMovies = JSON.parse(localStorage.getItem("storageMovies"));
    const searchByWords = storageMovies.filter((item) => {
      if (isShortMovies) {
        return item.duration <= 40 && item.year.toLowerCase().includes(word);
      }
      return item.year.toLowerCase().includes(word);
    });
    setMovies(searchByWords);
    handleSearchFilms(searchByWords);
  };

  //В зависимости от разрешения показывать разное кол-во фильмов
  const handleSearchFilms = (searchByWords) => {
    const handleShowMoviesWindowWidth = () => {
      if (window.innerWidth >= 1280) {
        const showMovieMaxWidth = searchByWords.slice(0, 12);
        console.log(showMovieMaxWidth);
        return showMovieMaxWidth;
      }
      if (window.innerWidth >= 768) {
        const showMovieMedWidth = searchByWords.slice(0, 8);
        console.log(showMovieMedWidth);
        return showMovieMedWidth;
      }
      if (window.innerWidth >= 320) {
        const showMovieMinWidth = searchByWords.slice(0, 5);
        console.log(showMovieMinWidth);
        return showMovieMinWidth;
      }
    };
    setShowMovies(handleShowMoviesWindowWidth);
  };

  //Показывать дополнительные фильмы кликом по кнопке
  const handleAddMovies = () => {
    if (window.innerWidth >= 1280) {
      const addMoviesMaxWidth = movies.slice(0, showMovies.length + 3);
      console.log(addMoviesMaxWidth);
      return addMoviesMaxWidth;
    }
    if (window.innerWidth >= 320) {
      const addMoviesMinWidth = movies.slice(0, showMovies.length + 2);
      console.log(addMoviesMinWidth);
      return addMoviesMinWidth;
    }
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
            // onSearchFilms={handleSearchFilms}
            movies={movies}
            onSearchFilms={handleSearchByWord}
            showMovies={showMovies}
            setIsShortMovies={setIsShortMovies}
            isShortMovies={isShortMovies}
            handleAddMovies={handleAddMovies}
            setShowMovies={setShowMovies}
            handleSearchFilms={handleSearchFilms}
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
