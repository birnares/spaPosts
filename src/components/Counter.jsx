import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div className="App-header">
      <h1>{count}</h1>
      <MyButton onClick={increment}>increment</MyButton>
      <MyButton onClick={decrement}>decrement</MyButton>
    </div>
  );
};

export default Counter;
