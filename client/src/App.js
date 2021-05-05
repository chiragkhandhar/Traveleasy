import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
      <div className="App"></div>
    </Router>
  );
}

export default App;
