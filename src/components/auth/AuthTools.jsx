
import UserInstance from "../UserManager";
import React from "react";
import { Cookies, withCookies } from "react-cookie";

export const withAuth = (Component) => {
    const AuthRoute = () => {
      const isAuth = !!UserInstance.getToken();
      if (isAuth) {
        return <Component />;
      } else {
        return <Redirect to="/" />;
      }
    };
  
    return AuthRoute;
  };