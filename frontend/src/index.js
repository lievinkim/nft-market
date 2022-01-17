import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MyNftContextProvider } from "./store/my-nft-context";

import App from "./App";

ReactDOM.render(
  <MyNftContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyNftContextProvider>,
  document.getElementById("root")
);
