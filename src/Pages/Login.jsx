import React from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from '../components/UI/button/MyButton';

const Login = () => {
  return (
    <div>
      <h1>Страница для логина</h1>
      <form>
        <MyInput type="text" placeholder="Ваш логин" />
        <MyInput type="password" placeholder="Ваш пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
