import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {useForm} from "react-hook-form";

export function EditPost() {

    const {listOfPosts, editPost, fetchPosts} = useContext(BlogContext);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const uniqueCategories = ['Articles', 'Tutorials', 'Rants']
    const [selectedPost, setSelectedPost] = useState();

    // useForm setup with empty default values for when no post is selected
    const {register, handleSubmit, reset, formState: {errors}} = useForm({values: {
            post_title:  selectedPost ? selectedPost.post_title: '',
            post_blurb: selectedPost ? selectedPost.post_blurb: ''
        }});

    // Use regex to make sure titles only contain text, spaces and single quotes
    // And that article content doesn't contain URLs and code.
    const editTitleRgx = /^[A-Za-z0-9 ']*$/;


    const handleCategoryChange = (event) => {
        event.preventDefault();

        // Clear selected post if no category is selected
        const category = event.target.value;
        if (!category) {
            setSelectedPost(null);
        }

        // Filter the posts based on the selected category
        fetchPosts(category, '', '', 20)
    };

    // Keep track of selected post, so we know what to edit
    // and what to display in the form fields
    const handlePostChange = (event) => {
        event.preventDefault();

        const id = +event.target.value;
        setSelectedPost(listOfPosts.find(post => post.post_id === id))
    };

    const handlePostEdit = (data) => {
        editPost(data, selectedPost.post_id);
        reset()
        setSelectedPost(null)
    };

    return (
        <div className="postEditFormWrapper">
            <form className="categoryAndPostSelectForm">
                <label htmlFor="postCategoryList">Select Category:</label>
                <select id="postCategoryList" onChange={handleCategoryChange} >
                    <option value="">Select Category</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <label htmlFor="postEditTitleList">Select Post:</label>
                <select id="postEditTitleList" onChange={handlePostChange}>
                    <option value="">Select Post</option>
                    {listOfPosts.map((post) => (
                        <option key={post.post_title} value={post.post_id}>
                            {post.post_title}
                        </option>
                    ))}
                </select>
            </form>
            <form className="postEditForm" onSubmit={handleSubmit(data => handlePostEdit(data))}>
                <label htmlFor="postTitleEdit">Edit Title</label>
                <input {...register("post_title", {
                    required: "This is a required field", maxLength: {
                        value: 15,
                        message: "Title mustn't be more than 15 characters long."
                    },
                    pattern: {
                        value: editTitleRgx,
                        message: "Please enter letters and numbers only."
                    }
                })} type="text" id="postTitleEdit" placeholder={selectedPost ? selectedPost.post_title: ''}/>
                {errors.post_title && <p>{errors.post_title.message}</p>}
                <label htmlFor="postBlurbEdit">Edit Content</label>
                <textarea {...register("post_blurb", {
                    required: "This is a required field", maxLength: {
                        value: 500,
                        message: "Content mustn't be more than 500 characters long."
                    }
                })} id="postBlurbEdit" placeholder={selectedPost ? selectedPost.post_blurb: ''}/>
                {errors.post_blurb && <p>{errors.post_blurb.message}</p>}
                <button type="submit">Submit Edit</button>
            </form>
        </div>
    )
}