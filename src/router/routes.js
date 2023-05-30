import About from "../Pages/About";
import Posts from "../Pages/Posts";
import PostIdPage from '../Pages/PostIdPage';
import NotFound from '../Pages/NotFound';
import Login from '../Pages/Login';

export const privateRoutes = [
    { path: '/about', component: About, exact: true },
    { path: '/posts', component: Posts, exact: true },
    { path: '/posts/:id', component: PostIdPage, exact: true },
    { path: '*', component: NotFound, exact: true },
]

export const publicRoutes = [
    { path: '/login', component: Login, exact: true },
]