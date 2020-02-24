import React from "react";
import "./Auth.css";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";
import ForgotPassReset from "./ForgotPassReset";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [resetting, setResetting] = React.useState("");
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

  async function sendResetRequest(e) {
    e.preventDefault();
    clearErrors();
    const error = Validate(e, errors);
    if (error) {
      setErrors({ ...errors, ...error });
    }
    try {
      let response = await Auth.forgotPassword(email);
      console.log(response);
      setResetting(true);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setErrors({ ...errors, cognito: err });
    }
  }

  if (!resetting) {
    return (
      <div className="parent-container">
        <section className="auth-container">
          <h4 className="title is-4">Forgot password</h4>
          <form style={{ padding: "15px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <p>
                Please enter the email address linked to your account. We'll
                email you a password reset link!
              </p>
            </div>
            <div className="input-container">
              <FormErrors formerrors={errors} />
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
              <section style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="login-button"
                  onClick={e => sendResetRequest(e)}
                >
                  Send reset link
                </button>
                <a href="/auth/login">Back</a>
              </section>
            </div>
          </form>
        </section>
      </div>
    );
  }
  return <Redirect to="/auth/resetpass" />;
}

export default ForgotPassword;
