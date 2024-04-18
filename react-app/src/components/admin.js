import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {EditPost} from "./edit-post";
import {useForm} from "react-hook-form";
import {AuthContext} from "../Providers/auth-provider";

export function Admin() {
    const {addPost, clearPosts} = useContext(BlogContext);
    const {user} = useContext(AuthContext);
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const randomImage = Math.floor(Math.random() * 28)
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        if (user) {
            setUserName(`${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`)
        }
    }, [user]);

    // Regex to enforce input patterns
    const lettersAndNumbersRgx = /^[A-Za-z0-9 ']*$/;

    const handlePostFormSubmit = (data) => {
        const formData = {
            post_title: data.post_title,
            posted_by: userName,
            publish_date: (new Date()).toLocaleDateString('en-GB'),
            post_blurb: data.post_blurb,
            post_category: data.post_category,
            img_address: `/images/articleImage (${randomImage}).png`
        };

        addPost(formData);
        reset();
    };

    const handleClearAllButton = () => {
        window.confirm("Are you sure you wish to delete all posts?") && clearPosts()
    }

    return (
        <div className="adminForms">
            <div className="postFormWrapper">
                <form className="addPostForm" onSubmit={handleSubmit(data => handlePostFormSubmit(data))}>
                    <label htmlFor="postedBy">Enter Post Title</label>
                    <input
                        {...register("post_title", {
                            required: "This is a required field.", pattern: {
                                value: lettersAndNumbersRgx,
                                message: "Please only enter letters and numbers."
                            }
                        })}
                        type="text"
                        id="postTitleId"
                        placeholder="Post Title"/>
                    {errors.post_title && <p>{errors.post_title.message}</p>}
                    <label htmlFor="postBlurbId">Enter Post blurb</label>
                    <textarea
                        {...register("post_blurb", {
                            required: "This is a required field."
                        })}
                        id="postBlurbId"
                        placeholder="Post Blurb"/>
                    {errors.post_blurb && <p>{errors.post_blurb.message}</p>}
                    <label htmlFor="postCategoryId">Enter Post Category</label>
                    <select
                        {...register("post_category", {
                            required: "This is a required field."
                        })} id="postCategoryId">
                        <option value="">Select Category</option>
                        <option value="Articles">Articles</option>
                        <option value="Tutorials">Tutorials</option>
                        <option value="Rants">Rants</option>
                    </select>
                    {errors.post_category && <p>{errors.post_category.message}</p>}
                    <button type="submit">Submit Post</button>
                </form>
                <button onClick={handleClearAllButton}>Clear All Posts</button>
            </div>
            <EditPost/>
        </div>

    );
}
