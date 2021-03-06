import React from "react";
import { Route, Redirect } from "react-router-dom";

const IsNotAuthenticated = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !user.isLoggedIn ? (
        <Component {...props} />
      ) : (
        handleRouteAcess(user, props)
      )
    }
  />
);
function handleRouteAcess(user, props) {
  switch (user.role.name) {
    case "Common":
      return (
        <Redirect
          to={{ pathname: "/user/index", state: { from: props.location } }}
        />
      );
    case "Admin":
      return (
        <Redirect
          to={{ pathname: "/admin/index", state: { from: props.location } }}
        />
      );
    default:
      return (
        <Redirect
          to={{ pathname: "/pageNotFound", state: { from: props.location } }}
        />
      );
  }
}

export default IsNotAuthenticated;
