import React from "react";
import "./Auth.css";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";
import {
  AuthWrapper,
  AuthContainer,
  AuthForm,
  AuthButton
} from "../../styledcomponents";
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
      console.log("Reset request obj: ", response);
      setResetting(true);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setErrors({ ...errors, cognito: err });
    }
  }

  if (!resetting) {
    return (
      <AuthWrapper>
        <AuthContainer>
          <h4 className="title is-4">Forgot Password</h4>
          <AuthForm>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <p>
                Please enter the email address linked to your account. We'll
                email you a password reset link!
              </p>
            </div>
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
              <AuthButton
                type="submit"
                className="login-button"
                onClick={e => sendResetRequest(e)}
              >
                Send reset link
              </AuthButton>
              <a href="/auth">Back</a>
            </section>
          </AuthForm>
        </AuthContainer>
      </AuthWrapper>
    );
  }
  return (
    <AuthWrapper>
      <div>
        <i
          className="far fa-check-circle"
          style={{ color: "yellowgreen", marginRight: "3px" }}
        />{" "}
        Password reset email sent!
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
