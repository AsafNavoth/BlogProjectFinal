import {RecommendedArticles} from "./recommendedArticles";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";

export function SingleArticlePage() {
    const {setCurrentFilters} = useContext(BlogContext);
    const [post, setPost] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPost(data)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error)
            }
        }
        fetchSinglePost();
        setCurrentFilters([post.category, '', '', 3, ''])
    }, [id]);


    return (
        <div className="container">
            {post ? (
                <div className="articlePage">
                    <div className="hero">
                        <h1>{post.post_title}</h1>
                        <p>{post.posted_by}</p>
                        <p>
                            {post.publish_date}・{post.post_category}
                        </p>
                    </div>
                    <div className="articlePageContent">
                        <img src={post.img_address} alt="Article Image"/>
                        <div className="articleText">
                            <p className="paragraphOne">
                                {post.post_blurb}
                            </p>
                        </div>
                    </div>
                    <RecommendedArticles category={post.post_category} postId={post.post_id}/>
                </div>
            ) : (
                <div className="spinner-border"
                     role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
}
