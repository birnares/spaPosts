import { useEffect, useState, useRef } from "react";
import "../Styles/App.css";
import Counter from "../components/Counter";
import Postlist from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import MySelect from "../components/UI/select/MySelect";
import MyLoader from "../components/UI/loader/MyLoader";
import MyPagination from "../components/UI/pagination/MyPagination";
import { usePosts } from "../Hooks/usePosts";
import { useFetching } from "../Hooks/useFetching";
import { useObserver } from "../Hooks/useObserver";
import PostService from "../api/PostSirvice";
import { getPageCount, getPageArray } from "../Utils/pages";
// import { usePagination } from "./Hooks/usePagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  //собственный хук который предоставляет часто используемый функционал, а именно обработку идникации загрузки и обработку ошибки получения данных
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  // собственный хук на подгрузку постов скроллом вниз

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  // цикл жизни компонента MOUNT UPDATE UNMOUNT
  useEffect(() => {
    fetchPosts();
  }, [page, limit]); // массив зависимостей оставляем пустым, чтобы фукнция отработала единожды

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
      <MySelect
        defaulValue="Количество постов на странице"
        value={limit}
        onChange={(value) => setLimit(value)}
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 15, name: "15" },
          { value: 20, name: "20" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <Postlist
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Список постов JS"}
        key={posts.id}
      />
      <div ref={lastElement} style={{ background: "transparent" }} />
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <MyLoader />
        </div>
      )}
      <MyPagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
