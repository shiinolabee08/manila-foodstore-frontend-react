import * as React from "react";
import * as ReactDOM from "react-dom";

import 'element-theme-default';
import LoginPage from "./modules/authenticate/pages/LoginPage";

ReactDOM.render(
  <div>
    <LoginPage/>
    </div>,
    document.getElementById("root")
  );