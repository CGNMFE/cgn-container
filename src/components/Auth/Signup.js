import React from "react";
import { connect } from "react-redux";
import { register } from "../../Redux/Reducers/authReducer";
import { Redirect, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";
import "./Auth.css";

export function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [confirmationCode, setConfirmation] = React.useState("");
  const [signedUp, setSignedUp] = React.useState(false);
  const [errors, setErrors] = React.useState({
    cognito: null,
    blankfield: false,
    passwordmatch: false
  });

  let { user } = props;

  function clearErrors() {
    setErrors({
      cognito: null,
      blankfield: false,
      passwordmatch: false
    });
  }

  async function registerUser(e) {
    e.preventDefault();

    clearErrors();
    const error = Validate(e, errors);
    if (error) {
      setErrors({ ...errors, ...error });
    }

    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      props.register(signUpResponse);
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setErrors({ ...errors, cognito: err });
    }
  }

  if (user && user.registered)
    return (
      <div id="welcome-wrapper">
        <h2>Welcome!</h2>
        <p>You have successfully registered a new account!</p>
        <p>Please confirm your email address before logging in.</p>
      </div>
    );
  return (
    <div className="parent-container">
      <div className="auth-container">
        <h4 className="title is-4">Sign up</h4>

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
            <div className="field">
              <label>
                <b>Email:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <label>
                <b>Phone Number:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="tel"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-phone"></i>
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="login-button"
              onClick={e => registerUser(e)}
            >
              Register
            </button>
            <Link to="/auth/login">
              <button type="button" className="cancel-button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { register })(Signup);
