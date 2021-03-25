import { Route, Switch } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { useState } from "react";
import "./App.css";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

const trueLoggedIn = () => {
  setLoggedIn(true)
}
// const falseLoggedIn = () => {
//   setLoggedIn(false)
// }

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies setLoggedIn={trueLoggedIn}/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
