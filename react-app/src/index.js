import React, {useContext} from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";

import {ErrorPage} from './components/errorPage';
import App from './App';
import {Admin} from "./components/admin";
import {Home} from "./components/home";
import {RandomArticle} from "./components/randomArticlePage";
import {CategoryPage} from "./components/category-page";
import {BlogProvider} from "./Providers/blog-provider";
import {AuthContext, AuthProvider} from "./Providers/auth-provider";
import {SignInPage} from "./components/sign-in-page";
import {SingleArticlePage} from "./components/singleArticlePage";
import {ContactPage} from "./components/contact";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/sign-in";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element:<Home/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/home",
                element: <Home/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/admin",
                element: <Admin/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/article/:id",
                element: <RandomArticle/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/article/single/:id",
                element: <SingleArticlePage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Articles",
                element: <CategoryPage category="Articles"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Tutorials",
                element: <CategoryPage category="Tutorials"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Rants",
                element: <CategoryPage category="Rants"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/contact-us",
                element: <ContactPage/>,
                errorElement: <ErrorPage/>
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <AuthProvider>
            <BlogProvider>
                <RouterProvider router={router}/>
            </BlogProvider>
        </AuthProvider>
)
