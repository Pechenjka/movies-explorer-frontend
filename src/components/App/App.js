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
  const [isSavedMovie, setIsSavedMovie] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getMovies();
      handleGetSavedMovies();
    }
  }, [loggedIn]);

  //Сохранение массива фильмов из внешнего API в локальное хранилище
  const getMovies = () => {
    setIsLoading(true);
    moviesApi
      .searchFilms()
      .then((res) => {
        // console.log(res);
        res.map((item) => {
          return {
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: !item.image ? "" : `https://api.nomoreparties.co${item.image.url}`,
            trailer: item.trailerLink,
            thumbnail: !item.image ? "" : `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
            movieId: item.id,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
          };
        });
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("storageMovies", JSON.stringify(res));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

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

  // const handleSavedMovies = (movie) => {
  //   // const isSaved = showMovies.some((item) => item.movieId === movie.movieId)
  //   // console.log(movie, isSaved);
  //   mainApi
  //     .savedMovies(movie)
  //     .then((newMovie) => {
  //       if (newMovie) {
  //         setIsSavedMovie([...isSavedMovie, newMovie]);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleGetSavedMovies = () => {
    mainApi.getSavedMovies().then((res) => {
      if (res) {
        setIsSavedMovie(res);
      }
    });
  };

  // const handleDeleteSavedMovie = (data) => {
  //   mainApi
  //     .deleteSavedMovie(data._id)
  //     .then((res) => {
  //       if (res) {
  //         const isDeletedMovie = isSavedMovie.filter((item) => item.movieId !== data._id);
  //         setIsSavedMovie(isDeletedMovie);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // function doubleSavedMovies(data) {
  //   setIsSavedMovie(data);
  //   setShowMovies(data);
  //   // localStorage.setItem("savedMovies", JSON.stringify(data));
  // }

  function handleLikeClick(data) {
    if (
      isSavedMovie &&
      isSavedMovie.find((item) => {
        return item.movieId === data.movieId;
      })
    ) {
      if (!data._id) {
        // console.log(data);
        data = isSavedMovie.find((item) => {
          return item.movieId === data.movieId;
        });
        console.log(data);
      }
      if (data._id) {
        return mainApi
          .deleteSavedMovie(data._id)
          .then((res) => {
            if (res) {
              const isDeletedMovie = isSavedMovie.filter((item) => item.movieId !== data._id);
              setIsSavedMovie(isDeletedMovie);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      return mainApi
        .savedMovies(data)
        .then((newMovie) => {
          if (newMovie) {
            setIsSavedMovie([...isSavedMovie, newMovie]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // } else {
  //   console.log("Фильма нет такого => будем добавлять");
  //   return mainApi.postMovie(data).then((res) => {
  //     // console.log("Добавлнный фильм =>", res);
  //     doubleSavedMovies([...savedMovies, res]);
  //   });
  // }

  // function handleLikeClick(data) {
  //   console.log("Поступившие данные", data);
  //   // mainApi.postMovie(data).then((res) => console.log(res));
  //   // Если фильм с таким movieId не содержится в savedMovies, то выполняем добавление фильма
  //   console.log("Сохраненные фильмы", savedMovies);
  //   if (
  //     savedMovies &&
  //     savedMovies.find((item) => {
  //       return item.movieId === data.movieId;
  //     })
  //   ) {
  //     console.log("Фильм уже добавлен => будем удалять");

  //     if (!data._id) {
  //       // console.log(data);
  //       data = savedMovies.find((item) => {
  //         return item.movieId === data.movieId;
  //       });
  //       console.log(data);
  //     }

  //     return mainApi.deleteMovie(data).then((res) => {
  //       // console.log(res);
  //       const filteredMovies = savedMovies.filter((item) => {
  //         return item.movieId !== data.movieId;
  //       });
  //       doubleSavedMovies(filteredMovies);
  //     });
  //   } else {
  //     console.log("Фильма нет такого => будем добавлять");
  //     return mainApi.postMovie(data).then((res) => {
  //       // console.log("Добавлнный фильм =>", res);
  //       doubleSavedMovies([...savedMovies, res]);
  //     });
  //   }
  // }

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
            movies={movies}
            onSearchFilms={handleSearchByWord}
            showMovies={showMovies}
            setIsShortMovies={setIsShortMovies}
            isShortMovies={isShortMovies}
            handleAddMovies={handleAddMovies}
            setShowMovies={setShowMovies}
            handleLikeClick={handleLikeClick}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            onSearchFilms={handleSearchByWord}
            loggedIn={loggedIn}
            isSavedMovie={isSavedMovie}
            handleLikeClick={handleLikeClick}
          />
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
