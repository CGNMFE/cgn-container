import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouteWrapper } from "./styledcomponents";
import MicroFrontend from "./Components/MicroFrontend";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Auth/Login";
import Banner from "./Components/Banner/Banner";
import ForgotPass from "./Components/Auth/ForgotPass";
import ForgotPassReset from "./Components/Auth/ForgotPassReset";
import CreateUser from "./Components/Admin/CreateUser";
import { connect } from "react-redux";
import { login, logout } from "./Redux/Reducers/authReducer";
import { Auth } from "aws-amplify";

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
    const { user } = this.props;
    return (
      <RouteWrapper
        flexDirection={
          user && user.username && !user.challengeName ? "column" : "row"
        }
      >
        <Router>
          {user && user.username && !user.challengeName ? (
            <Header user={this.props.user} logout={this.props.logout} />
          ) : null}
          <Route path="/auth" component={Banner} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/auth/" component={Login} />
            <Route exact path="/auth/forgot" component={ForgotPass} />
            <Route exact path="/auth/resetpass" component={ForgotPassReset} />
            <Route exact path="/admin/createuser" component={CreateUser} />
          </Switch>
        </Router>
      </RouteWrapper>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login, logout })(App);
