import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function RandomArticle() {

    const {id} = useParams();
    const [post, setPost] = useState(null);

    // Get random int for image that's based on the id parameter
    // This is used so that we get a new image only once per refresh
    const randomImage = Math.round(id / 100 * 27) + 1;

    // Get a random placeholder article using the id parameter
    // This function will be called every time the id parameter is changed
    // To ensure a new article is given
    useEffect(() => {
        async function getPost() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const postJson = await response.json();

            setPost(postJson);
        }

        getPost();

    }, [id]);

    return (
        <div className="container">
            {post ? (
                <div className="articlePage">
                    <div className="hero">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="articlePageContent">
                        <img src={`/images/articleImage (${randomImage}).png`}
                             alt="Article Image"/>
                        <div className="articleText">
                            <p className="paragraphOne">
                                {post.body}
                            </p>
                        </div>
                    </div>
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
