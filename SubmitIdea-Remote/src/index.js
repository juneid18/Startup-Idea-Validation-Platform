import React from "real-react";
import ReactDOM from "real-react-dom/client";

// In standalone dev mode, seat the globals so externals have them.
// When running in federated mode inside the Host, the Host provides these. 
window.React = React;
window.ReactDOM = ReactDOM;

import("./bootstrap");
