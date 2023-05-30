import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router/routes";
import Login from '../Pages/Login';
import { AuthContext } from '../context/context';
import Loader from "./UI/loader/MyLoader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader/>
    }
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
            <Route path="*" element={<Login replace/> } />
          </Routes>
        </div>
      )}
    </>
  );
};
// https://www.youtube.com/watch?v=GNrdg3PzpJQ

export default AppRouter;
