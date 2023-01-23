
import UserInstance from "../UserManager";
import React from "react";

export const isAuth = !!localStorage.token;



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