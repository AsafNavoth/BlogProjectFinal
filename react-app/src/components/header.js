import {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {AuthContext} from "../Providers/auth-provider";
import SignIn from "./sign-in";
import Login from "./login";

export function Header() {

    const {user, signOut} = useContext(AuthContext);

    // Keep track of current route path
    // This is used for className changes for page-specific styling
    const location = useLocation()
    const [userName, setUserName] = useState(null);

    // Regex to check whether the current URL is on one of
    // the random articles (i.e. after /article/ it's just a number between 1 and 100)
    const randomArticleRgx = /^\/article\/\d{1,2}$/;

    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        if (user) {
            setUserName(`${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`)
        }
    }, [user]);

    const scrollToTopOfPage = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    };

    return (
        <header className="navigation">
            <p onClick={scrollToTopOfPage} className="logo">
                <Link to="/">Personally™
                </Link>
            </p>
            {user ? <>
                <div className="right-buttons">
                    <nav className="navCategories">
                        <Link onClick={scrollToTopOfPage}
                              className={location.pathname.includes('Articles') ? 'currentPageButton' : ''}
                              id="Articles"
                              to="/category/Articles">Articles
                        </Link>
                        <Link onClick={scrollToTopOfPage}
                              className={location.pathname.includes('Tutorials') ? 'currentPageButton' : ''}
                              id="Tutorials"
                              to="/category/Tutorials">Tutorials
                        </Link>
                        <Link onClick={scrollToTopOfPage}
                              className={location.pathname.includes('Rants') ? 'currentPageButton' : ''} id="Rants"
                              to="/category/Rants">Rants
                        </Link>
                        <Link onClick={scrollToTopOfPage} to={`article/${Math.floor((Math.random() * 101))}`}
                              className={location.pathname.match(randomArticleRgx) ? 'currentPageButton' : ''}>
                            Random Article
                        </Link>
                        <Link onClick={scrollToTopOfPage}
                              className={location.pathname.includes('/admin') ? 'currentPageButton' : ''} id="Admin"
                              to="admin">Admin
                        </Link>
                    </nav>
                    <a href={"#newsletter"} className="subButton" id="headerSubButton">
                        Subscribe
                    </a>
                    <a className="userName">Signed in as: {userName}</a>
                    <Link to="/" className="subButton" onClick={() => {
                        signOut();
                        scrollToTopOfPage();

                    }}>Sign Out
                    </Link>
                </div>
            </> : <SignIn/>
            }
        </header>
    )
}