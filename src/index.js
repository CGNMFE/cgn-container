import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config";
import store from "./Redux/store";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
