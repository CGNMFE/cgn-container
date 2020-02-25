import React, { useEffect } from "react";
import "./Auth.css";
import { Auth } from "aws-amplify";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";
import { Redirect, Link } from "react-router-dom";

function ForgotPassword(props) {
  const [verificationCode, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPass1, setNewPass1] = React.useState("");
  const [newPass2, setNewPass2] = React.useState("");
  const [pwsMatch, setMatching] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [errors, setErrors] = React.useState({
    cognito: null,
    blankfield: false,
    passwordmatch: false
  });

  function clearErrors() {
    setErrors({
      cognito: null,
      blankfield: false,
      passwordmatch: false
    });
  }

  useEffect(() => {
    if (props.history.location.search.length > 3) {
      let splitSearch = props.history.location.search.split("$");
      setCode(splitSearch[1]);
    }
  }, []);

  useEffect(() => {
    if (newPass1 === newPass2) {
      setMatching(true);
    } else if (newPass1 !== newPass2) {
      setMatching(false);
    }
  }, [newPass1, newPass2]);

  async function sendResetRequest(e) {
    e.preventDefault();
    clearErrors();
    const error = Validate(e, errors);
    if (error) {
      setErrors({ ...errors, ...error });
    }
    if (pwsMatch) {
      try {
        const response = await Auth.forgotPasswordSubmit(
          email,
          verificationCode,
          newPass2
        );
        console.log(response);
        setReset(true);
      } catch (error) {
        let err = null;
        !error.message ? (err = { message: error }) : (err = error);
        setErrors({ ...errors, cognito: err });
      }
    } else setErrors({ ...errors, passwordmatch: true });
  }
  if (reset === true) return <Redirect to="/" />;
  console.log(props.history);
  return (
    <div className="parent-container">
      <section className="auth-container">
        <h4 className="title is-4">New Password</h4>
        <form style={{ padding: "15px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <p>
              Please enter the verification code sent to your email address
              along with your email address and a new password.
            </p>
            <FormErrors formerrors={errors} />
          </div>
          <div className="input-container">
            <div className="field">
              <label>
                <b>Verification Code:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  // id="username"
                  type="text"
                  value={verificationCode}
                  placeholder="Enter Verification Code"
                  onChange={e => setCode(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-check"></i>
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
                <b>New Password:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={newPass1}
                  onChange={e => setNewPass1(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <label>
                <b>Confirm Password:</b>
              </label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={newPass2}
                  onChange={e => setNewPass2(e.target.value)}
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
              onClick={e => sendResetRequest(e)}
              // disabled
            >
              Submit Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ForgotPassword;
