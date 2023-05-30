import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router/routes";
import Login from '../Pages/Login';

const AppRouter = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <div>
          <Routes>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                Component={route.component}
                path={route.path}
                exact={route.exact}
              />
            ))}
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                Component={route.component}
                path={route.path}
                exact={route.exact}
              />
            ))}
            <Route path="*" element={<Login to='/' replace/> } />
          </Routes>
        </div>
      )}
    </>
  );
};
// https://www.youtube.com/watch?v=GNrdg3PzpJQ

export default AppRouter;
