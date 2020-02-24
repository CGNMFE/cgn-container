import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Banner from "./components/Banner/Banner";
import ForgotPass from "./components/Auth/ForgotPass";
import ForgotPassReset from "./components/Auth/ForgotPassReset";
import { connect } from "react-redux";
import { login } from "./Redux/Reducers/authReducer";
import { Auth } from "aws-amplify";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  async componentDidMount() {
    console.log(this.props);
    const session = await Auth.currentSession();
    if (session) this.setAuthStatus(true);
    const user = await Auth.currentAuthenticatedUser();
    if (user && user.username) {
      this.setAuthStatus(true);
      console.log(user.username);
      this.props.login(user);
      console.log("login fired");
    }
    console.log(user);
  }

  render() {
    const { user } = this.props.user;
    return (
      <Router>
        <Route path="/auth" component={Banner} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/auth/forgot" component={ForgotPass} />
          <Route exact path="/auth/resetpass" component={ForgotPassReset} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(App);
