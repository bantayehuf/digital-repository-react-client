import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { PageLoading } from "./components/LoadingSpinner";

import ProtectedRoutes from "./components/ProtectedRoutes";
import Error403 from "./error-pages/403/403";

// // Pages
const Login = React.lazy(() => import("./pages/login"));
const RootDashboard = React.lazy(() => import("../repository"));
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={<PageLoading />}>
          <Switch>
            <ProtectedRoutes
              path="/repository"
              component={RootDashboard}
              roles={["SUPER_ADMIN", "ADMIN", "ENCODER"]}
            />

            <Route
              path="/error-403"
              exact
              name="Error-403"
              render={(props) => {
                return <Error403 {...props} />;
              }}
            />

            <Route
              path="/"
              name="Login Page"
              render={(props) => {
                return <Login {...props} />;
              }}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
