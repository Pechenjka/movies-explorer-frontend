import { Route, Switch } from "react-router";
import { useState } from "react";
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

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
            <Register />
          </Route>
          <Route exact path="/signin">
            <Login />
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
