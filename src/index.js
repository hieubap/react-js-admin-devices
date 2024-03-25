import { ChakraProvider } from "@chakra-ui/react";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
// import RtlLayout from "./layouts/rtl";
import store from "./redux";
import theme from "./theme/theme";
import "react-datepicker/dist/react-datepicker.css";
// import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from="/" to="/auth" />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </Provider>
  </ChakraProvider>
);
