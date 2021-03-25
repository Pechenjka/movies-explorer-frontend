import { Route, Switch } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { useState } from "react";
import "./App.css";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies setLoggedIn={setLoggedIn} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
