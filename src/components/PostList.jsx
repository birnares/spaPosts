import React from "react";
import Postitem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const Postlist = ({ posts, title, remove }) => {
  //  Условная отрисовка для отображения надписи когда постов на странице нет
  if (!posts.length) {
    return (
      <div>
        <h1 style={{ color: "teal" }}>Посты не найдены!</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <Postitem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Postlist;
