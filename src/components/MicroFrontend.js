import React, { Component } from "react";

class MicroFrontend extends Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    //First we check if the relevant script, which has a unique ID, has already been downloaded, in which case we can just render it immediately.

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    //If not, we fetch the asset-manifest.json file from the appropriate host, in order to look up the full URL of the main script asset. Once we've set the script's URL, all that's left is to attach it to the document with our function renderMicroFrontend()

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        console.log(manifest.files["main.js"]);
        console.log(manifest);
        console.log(manifest.entrypoints[0]);
        console.log(this.props.history);
        script.src = `${host}/${manifest.entrypoints[0]}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
        console.log(document.head);
      });
  }

  //When our MicroFrontend component un-mounts, we want to un-mount the relevant microfrontends too. We use another global function like we use in renderMicroFrontend() with the appropriate lifecycle method to do this.

  componentWillUnmount() {
    const { name, window } = this.props;
    window[`unmount${name}`](`${name}-container`);
  }

  //We call a global function put into scope by the script that was downloaded in componentDidMount. We pass the ID of the main element where the micro app should render itself along with a history object.

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;
    console.log(`renderBrowse`);
    window[`render${name}`](`${name}-container`, history);
    // Ex: window.renderBrowse('browse-container', history)
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window
};

export default MicroFrontend;
