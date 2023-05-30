import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context/context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const login = (ev) => {
    ev.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true')
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Ваш логин" />
        <MyInput type="password" placeholder="Ваш пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
