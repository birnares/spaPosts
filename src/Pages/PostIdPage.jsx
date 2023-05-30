import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../Hooks/useFetching";
import PostService from "../api/PostSirvice";
import MyLoader from "../components/UI/loader/MyLoader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div style={{ margin: 10 }}>
          {post.id}. {post.title} ! <br /> {post.body}
        </div>
      )}
      <h1>Комментарии:</h1>
      {isComLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ margin: 10 }}>
              <h5>{comm.email}</h5>
              <p>{comm.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostIdPage;
