import {Post} from "./post";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {Link, Navigate} from "react-router-dom";
import {AuthContext} from "../Providers/auth-provider";
import SignIn from "./sign-in";

export function Posts() {
    const {fetchPosts, setCurrentFilters} = useContext(BlogContext);
    const {user} = useContext(AuthContext)


    useEffect(() => {
        fetchPosts('all')
        setCurrentFilters(['all', '', '', '', ''])
    }, []);

    return ( user ?
        <div className="articles">
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Articles</p>
                    <Link to="/category/Articles/" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    category={'Articles'}/>
            </div>
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Tutorials</p>
                    <Link to="/category/Tutorials" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    category={'Tutorials'}/>
            </div>
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Rants</p>
                    <Link to="/category/Rants" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    category={'Rants'}/>
            </div>
        </div> : null
    );
}
