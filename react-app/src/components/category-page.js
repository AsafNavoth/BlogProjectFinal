import {Post} from "./post";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {useLocation} from "react-router-dom";
import {AuthContext} from "../Providers/auth-provider";

export function CategoryPage({category}) {
    const {fetchPosts, fetchPostCount, setCurrentFilters} = useContext(BlogContext);
    const {user} = useContext(AuthContext);
    const [titleInputData, setTitleInputData] = useState('');
    const [lastNameInputData, setLastNameInputData] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('')
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const location = useLocation();

    useEffect(() => {
        setTitleInputData('');
        setLastNameInputData('');
        setTitleSearch('');
        setLastNameSearch('');
        setCurrentFilters([category, titleSearch, lastNameSearch, 5, pageNumber]);
    }, [category]);

    useEffect(() => {
        fetchPostCount(category).then(setTotalPosts)
    }, [category]);

    useEffect(() => {
        setPageNumber(0)
    }, [location]);

    useEffect(() => {
        fetchPosts(category, titleSearch, lastNameSearch, 5, pageNumber);
    }, [titleSearch, lastNameSearch, pageNumber, category]);

    const scrollToTopOfPage = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleInputChange = (event, dataType) => {
        if (dataType === 'title') {
            setTitleInputData(event.target.value);
        } else if (dataType === 'lastName') {
            setLastNameInputData(event.target.value);
        }
    };

    const handleSearch = (dataType) => {
        if (dataType === 'title') {
            setTitleSearch(titleInputData);
        } else if (dataType === 'lastName') {
            setLastNameSearch(lastNameInputData);
        }
    };

    const handleNextPage = () => {
        setPageNumber((pageNumber + 5) % totalPosts)
    }
    const handlePrevPage = () => {
        setPageNumber((pageNumber - 5) % totalPosts)
    }

    return ( user ?
        <div className="categoryPage">
            <h1 className="categoryTitle">{category}</h1>
            <div className="postQuery">
                <label htmlFor="postQuery">Search By Post Title</label>
                <div>
                    <input type="text" id="postQuery" onChange={(event) => handleInputChange(event, 'title')}
                           value={titleInputData}/>
                    <button onClick={() => handleSearch('title')}>🔎</button>
                </div>
                <label htmlFor="userQuery">Search By Last Name</label>
                <div>
                    <input type="text" id="userQuery" onChange={(event) => handleInputChange(event, 'lastName')}
                           value={lastNameInputData}/>
                    <button onClick={() => handleSearch('lastName')}>🔎</button>
                </div>
            </div>
            <div className="categoryPagePosts">
                <Post category={category}/>
                <div className="prevNextButtons">
                    {(pageNumber > 0) ? <button className="previousButton" onClick={() => {
                        handlePrevPage();
                        scrollToTopOfPage()
                    }}>Previous</button> : null}
                    {(pageNumber <= totalPosts - 5) ?
                        <button className="nextButton" onClick={() => {
                            handleNextPage();
                            scrollToTopOfPage()
                        }}>Next</button> : null}
                </div>
            </div>
        </div>: null
    );
}