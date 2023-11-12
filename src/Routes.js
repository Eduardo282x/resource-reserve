import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/Authentication/Login/Login";
import { Home } from "./components/Home/Home";
import { Layout } from "./components/Layouts/Layout";

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <Layout>{children}</Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default Routes;
