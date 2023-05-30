import { useEffect, useState } from "react";
import "../Styles/App.css";
import Counter from "../components/Counter";
import Postlist from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../Hooks/usePosts";
import PostService from "../api/PostSirvice";
import MyLoader from "../components/UI/loader/MyLoader";
import { useFetching } from "../Hooks/useFetching";
import { getPageCount, getPageArray } from "../Utils/pages";
// import { usePagination } from "./Hooks/usePagination";
import MyPagination from "../components/UI/pagination/MyPagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  //собственный хук который предоставляет часто используемый функционал, а именно обработку идникации загрузки и обработку ошибки получения данных
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  // цикл жизни компонента MOUNT UPDATE UNMOUNT
  useEffect(() => {
    fetchPosts();
  }, [page]); // массив зависимостей оставляем пустым, чтобы фукнция отработала единожды

  //   Двусторонее связывание с компонентом PostForm
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // в качестве аргумента принимаем Post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <Counter />
      <MyButton style={{ marginRight: 20 }} onClick={fetchPosts}>
        Get Posts
      </MyButton>
      <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <MyLoader />
        </div>
      ) : (
        <Postlist
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов JS"}
          key={posts.id}
        />
      )}
      <MyPagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
