import {BlogContext} from "../Providers/blog-provider";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Providers/auth-provider";
import {Link} from "react-router-dom";

export function Post(props) {
    const {deletePost, listOfPosts} = useContext(BlogContext);
    const {user} = useContext(AuthContext);

    const scrollToTopOfPage = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <div>
            {listOfPosts.filter(post => (post.post_category === props.category) && post.post_id !== props.post_id).map((post, index) => (
                <div key={index} onClick={scrollToTopOfPage} className="article">
                    <div className="articleText">
                        <div className="articleHead">
                            <div className="articleButtons">
                                <Link to={`/article/single/${post.post_id}`}>Read More</Link>
                                {user ? <button onClick={() => deletePost(post.post_id)}>Delete</button> : null}
                            </div>
                            <p className="publishDate">{post.publish_date}</p>
                            <p className="postedBy">{post.posted_by}</p>
                            <h3 className="articleTitle">{post.post_title}</h3>
                        </div>
                        <p className="summaryBlurb">{post.post_blurb}</p>
                    </div>
                    <img src={post.img_address} alt=""/>
                </div>))}
        </div>);
}