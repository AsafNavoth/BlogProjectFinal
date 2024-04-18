import {Post} from "./post";
import {useContext} from "react";
import {BlogContext} from "../Providers/blog-provider";

export function RecommendedArticles(props) {

    return (
        <div className="recommendedArticles">
            <h1>Recommended Articles</h1>
            <Post onClickArticle={props.onClickArticle} category={props.category} post_id={props.postId}/>
        </div>
    )
}