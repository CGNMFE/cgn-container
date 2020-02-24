import React from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/Reducers/authReducer";
import { Redirect } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import "./Auth.css";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";

export function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({
    cognito: null,
    blankfield: false,
    passwordmatch: false
  });

  let { user, authenticated } = props;

  function clearErrors() {
    setErrors({
      cognito: null,
      blankfield: false,
      passwordmatch: false
    });
  }

  async function loginUser(e) {
    e.preventDefault();
    // props.login(username, password);
    clearErrors();
    const error = Validate(e, errors);
    if (error) {
      setErrors({ ...errors, ...error });
    }

    try {
      const signInResponse = await Auth.signIn({
        username,
        password
      });
      props.login(signInResponse);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setErrors({ ...errors, cognito: err });
    }
    console.log(props);
  }

  if (user && user.username) {
    console.log(user.username);
    return <Redirect to="/" />;
  }
  return (
    <div className="parent-container">
      <div className="auth-container">
        <h4 className="title is-4">Sign in</h4>
        <FormErrors formerrors={errors} />
        <form>
          <div className="input-container">
            <div className="field">
              <label>
                <b>Username:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="username"
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <label>
                <b>Password:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="login-button"
              onClick={e => loginUser(e)}
            >
              Login
            </button>
            <section id="auth-bottom">
              <div>
                Not a member? <a href="/auth/signup">Sign Up</a>
              </div>
              <div>
                <a href="/auth/forgot">Forgot your password?</a>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(Login);
