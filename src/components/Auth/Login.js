import React, { useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/Reducers/authReducer";
import { Redirect } from "react-router-dom";
import {
  AuthWrapper,
  AuthContainer,
  AuthForm,
  AuthButton,
  CenterRow
} from "../../styledcomponents";
import { Auth } from "aws-amplify";
import "./Auth.css";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";

export function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPass] = React.useState("");
  const [errors, setErrors] = React.useState({
    cognito: null,
    blankfield: false,
    passwordmatch: false
  });

  let { user } = props;

  useEffect(() => {}, [user]);

  function clearErrors() {
    setErrors({
      cognito: null,
      blankfield: false,
      passwordmatch: false
    });
  }

  async function loginUser(e) {
    e.preventDefault();
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

  async function setNewPassword(e) {
    e.preventDefault();
    const response = await Auth.completeNewPassword(user, newPassword);
    console.log(response);
    const currentUser = await Auth.currentAuthenticatedUser();
    props.login(currentUser);
  }

  if (user && user.username && user.challengeName !== "NEW_PASSWORD_REQUIRED") {
    console.log(user.username);
    return <Redirect to="/" />;
  }
  return (
    <AuthWrapper background="blue">
      <AuthContainer>
        <h4 className="title is-4">Sign In</h4>
        <AuthForm>
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
              {user && user.username ? <b>New Password:</b> : <b>Password:</b>}
            </label>
            <p className="control has-icons-left">
              <input
                className="input"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={user && user.username ? newPassword : password}
                onChange={
                  user && user.username
                    ? e => setNewPass(e.target.value)
                    : e => setPassword(e.target.value)
                }
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div style={{ height: "18px" }}>
            <FormErrors formerrors={errors} />
          </div>
          <AuthButton
            type="submit"
            onClick={
              user && user.username ? e => setNewPassword(e) : e => loginUser(e)
            }
          >
            Login
          </AuthButton>
          <CenterRow>
            <a href="/auth/forgot">Forgot your password?</a>
          </CenterRow>
        </AuthForm>
      </AuthContainer>
    </AuthWrapper>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(Login);
