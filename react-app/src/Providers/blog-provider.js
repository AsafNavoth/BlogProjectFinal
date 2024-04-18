import {createContext, useState} from "react";


export const BlogContext = createContext(null);
const backend_url = process.env.REACT_APP_API_URL

export function BlogProvider({children}) {
    const [listOfPosts, setPosts] = useState([]);
    const [currentFilters, setCurrentFilters] = useState(['all', '', '', '', ''])

    const fetchPosts = async (category= '', contentFilter= '', userFilter= '', limit= '', start= '') => {
        try {
            const response =
                await fetch(`${backend_url}/posts?category=${category}&contentFilter=${contentFilter}&userFilter=${userFilter}&limit=${limit}&start=${start}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setPosts(data);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }

    const fetchPostCount = async (category) => {
        try {
            const response = await fetch(`${backend_url}/posts/count?category=${category}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json();
            return data.count
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }


    const clearPosts = () => {
        setPosts([])
    }

    const addPost = async (post) => {
        try {
            const response = await fetch(`${backend_url}/posts`,
                {method: 'POST', body: JSON.stringify(post), headers: {'Content-Type': 'application/json'}})
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${backend_url}/posts/${id}`,
                {method: 'DELETE'})
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
        await fetchPosts(...currentFilters)
    }

    const editPost = async (data, post_id) => {
        try {
            const response = await fetch(`${backend_url}/posts/${post_id}`,
                {method: 'PUT', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }


    const value = {listOfPosts, addPost, deletePost, clearPosts, editPost, fetchPosts, fetchPostCount, setCurrentFilters}

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}